/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { apiOnesignal } from '@shared/service/Onesignal-api';
import { inject, injectable } from 'tsyringe';

import { Post } from '.prisma/client';

import { IPostsRepository } from '../repositories/IPostRepositoty';

interface Props {
  description: string;
  image: string;
  fk_id_user: string;
  like: number;
}

@injectable()
export class CreatePostService {
  constructor(
    @inject('PrismaPost')
    private postRepository: IPostsRepository,

    @inject('Cache')
    private cache: ICacheProvider,
  ) { }

  async execute({
    description,
    image,
    fk_id_user,
    like,
  }: Props): Promise<Post> {
    const create = await this.postRepository.create(
      {
        description,
        image,
        fk_id_user,
      },
      like,
    );

    await this.cache.invalidate('posts');

    await apiOnesignal.post('/notifications', {
      app_id: process.env.ONE_SIGNAL_APP_ID,
      contents: {
        en: 'Venha conferir o novo post',
      },
      headings: {
        en: 'Novo post',
      },
      included_segments: ['All'],
    });
    return create;
  }
}
