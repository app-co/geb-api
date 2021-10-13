import { inject, injectable } from 'tsyringe';

import { Post } from '.prisma/client';

import { IPostsRepository } from '../repositories/IPostRepositoty';

@injectable()
export class ListAllPost {
   constructor(
      @inject('PrismaPost')
      private postRepository: IPostsRepository,
   ) {}

   async execute(): Promise<Post[]> {
      const find = await this.postRepository.listAllPost();
      const awsUrl = 'https://geb.s3.us-east-2.amazonaws.com/posts';

      const posts = find.map(h => ({
         ...h,
         url_image: `${awsUrl}/${h.image}`,
      }));

      posts.reverse();

      return posts;
   }
}
