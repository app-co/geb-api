/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IPostsDtos } from '@shared/dtos';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
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
   ) {}

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

      await this.cache.invalidate('post');

      return create;
   }
}
