import { inject, injectable } from 'tsyringe';

import { IPostsRepository } from '../repositories/IPostRepositoty';
import { IUsersRepository } from '../../users/repositories/IUsersRespository';

import { Post } from '.prisma/client';

@injectable()
export class ListAllPost {
   constructor(
      @inject('PrismaPost')
      private postRepository: IPostsRepository,
   ) {}

   async execute(): Promise<Post[]> {
      const find = await this.postRepository.listAllPost();

      const posts = find.map(h => ({
         ...h,
         url_image: `${process.env.AWS_URL}/posts/${h.image}`,
      }));

      posts.reverse();

      console.log(posts);

      return posts;
   }
}
