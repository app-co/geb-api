import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { inject, injectable } from 'tsyringe';

import { Post } from '.prisma/client';

import { IPostsDtos } from '../Dtos/IPostsDtos';
import { IPostsRepository } from '../repositories/IPostRepositoty';

interface IProps {
   image: string;
   user_id: string;
   description: string;
}

@injectable()
export class CreatePostService {
   constructor(
      @inject('PrismaPost')
      private postRepository: IPostsRepository,

      @inject('Storage')
      private storage: IStorageProvider,
   ) {}

   async execute({ image, user_id, description }: IProps): Promise<Post> {
      await this.storage.saveFile(image, 'posts');

      console.log(user_id, description);

      const create = await this.postRepository.create({
         image,
         user_id,
         description,
      });

      return create;
   }
}
