/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { Post } from '.prisma/client';

import { IUsersRepository } from '../../users/repositories/IUsersRespository';
import { IPostsRepository } from '../repositories/IPostRepositoty';

@injectable()
export class ListAllPost {
   constructor(
      @inject('PrismaPost')
      private postRepository: IPostsRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(): Promise<any> {
      let post = await this.cache.recover<Post[]>('post');

      if (!post) {
         post = await this.postRepository.listAllPost();

         await this.cache.save(`post`, post);

         console.log('banco list all post');
      }

      return post;
   }
}
