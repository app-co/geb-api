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

   async execute(id: string): Promise<Like> {
      const find = await this.postRepository.findLikeById(id);

      if (!find) {
         throw new Err('post nao encontrado');
      }

      const like = (find.like += 1);

      const lk = await this.postRepository.upLike(id, like);

      await this.cache.invalidate('post');

      return lk;
   }
}
