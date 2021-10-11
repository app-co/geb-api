/* eslint-disable no-multi-assign */
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Post, PrismaClient } from '.prisma/client';

import { IPostsRepository } from '../repositories/IPostRepositoty';

@injectable()
export class LikeService {
   constructor(
      @inject('PrismaPost')
      private postRepository: IPostsRepository,
   ) {}

   async execute(image_id: string): Promise<Post> {
      const find = await this.postRepository.findById(image_id);

      if (!find) {
         throw new Err('post nao encontrado');
      }

      const like = (find.like += 1);
      const { post } = new PrismaClient();

      const updateLIke = await post.update({
         where: { id: find.id },
         data: { like },
      });

      return updateLIke;
   }
}
