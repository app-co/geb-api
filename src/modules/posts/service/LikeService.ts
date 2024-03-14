/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-multi-assign */
import { Like } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { apiOnesignal } from '@shared/service/Onesignal-api';
import { inject, injectable } from 'tsyringe';

import { prisma } from '../../../utils/prisma';
import { IPostsRepository } from '../repositories/IPostRepositoty';

@injectable()
export class LikeService {
  constructor(
    @inject('PrismaPost')
    private postRepository: IPostsRepository,

    @inject('Cache')
    private cache: ICacheProvider,
  ) { }

  async execute(user_id: string, fk_id_post: string): Promise<Like> {
    const user = await prisma.user.findUnique({ where: { id: user_id } });
    const find = await prisma.post.findFirst({
      where: { id: fk_id_post },
      include: { like: true },
    });

    if (!find) {
      throw new Err('post nao encontrado');
    }

    const findLikeUser = find.like.find(h => h.user_id === user_id);

    if (findLikeUser) {
      const like = await prisma.like.update({
        where: { id: findLikeUser.id },
        data: { liked: !findLikeUser.liked },
      });
      await this.cache.invalidate('posts');

      return like;
    }

    const lk = await this.postRepository.createLike(user_id, fk_id_post);

    await this.cache.invalidate('posts');

    await apiOnesignal.post('/notifications', {
      app_id: process.env.ONE_SIGNAL_APP_ID,
      contents: {
        en: 'Novo like no seu post',
      },
      headings: {
        en: 'Alguem gostou do seu post',
      },
      filters: [
        {
          field: 'tag',
          key: 'username',
          relation: 'is',
          value: user.membro,
        },
      ],
    });

    return lk;
  }
}
