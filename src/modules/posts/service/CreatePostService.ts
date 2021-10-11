import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { inject, injectable } from 'tsyringe';

import { Post } from '.prisma/client';

import { IPostsDtos } from '../Dtos/IPostsDtos';
import { IPostsRepository } from '../repositories/IPostRepositoty';

@injectable()
export class CreatePostService {
   constructor(
      @inject('PrismaPost')
      private postRepository: IPostsRepository,

      @inject('StorageProvider')
      private storage: IStorageProvider,
   ) {}

   async execute(data: IPostsDtos): Promise<Post> {
      await this.storage.saveFile(data.image, 'posts');

      const create = await this.postRepository.create({
         image: data.image,
         user_id: data.user_id,
         description: data.description,
      });

      return create;
   }
}
