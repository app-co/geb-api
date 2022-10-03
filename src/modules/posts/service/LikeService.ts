/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-multi-assign */
import { Like, Post, PrismaClient } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { FindProfile } from '../../users/service/FindProfile';
import { IPostsRepository } from '../repositories/IPostRepositoty';

@injectable()
export class LikeService {
   constructor(
      @inject('PrismaPost')
      private postRepository: IPostsRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(user_id: string, fk_id_post: string): Promise<Like> {
      const find = await this.postRepository.findById(fk_id_post);
      const findLik = await this.postRepository.findLikeByUserId(user_id);

      if (!find) {
         throw new Err('post nao encontrado');
      }

      const lk = await this.postRepository.createLike(user_id, fk_id_post);

      await this.cache.invalidate('post');

      return lk;
   }
}
