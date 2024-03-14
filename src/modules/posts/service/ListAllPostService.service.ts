/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { prisma } from '../../../lib';
import { IPostsRepository } from '../repositories/IPostRepositoty';

interface IPost {
  id: string;
  image: string;
  description: string;
  created_at: string;
  fk_id_user: string;
  like: {
    id: string;
    like: number;
    liked: boolean;
    user_id: string;
    fk_id_post: string;
  }[];
}

@injectable()
export class ListAllPost {
  constructor(
    @inject('PrismaPost')
    private postRepository: IPostsRepository,

    @inject('Cache')
    private cache: ICacheProvider,
  ) { }

  async execute(): Promise<any> {
    let post = await this.cache.recover<IPost[]>('posts');

    if (!post) {
      post = (await prisma.post.findMany({
        include: { like: true },
        orderBy: { created_at: 'desc' },
      })) as unknown as IPost[];

      await this.cache.save(`posts`, post);
    }

    return post;
  }
}
