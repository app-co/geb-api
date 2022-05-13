import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { inject, injectable } from 'tsyringe';

import { Post } from '.prisma/client';

import { IPostsDtos } from '../Dtos/IPostsDtos';
import { IPostsRepository } from '../repositories/IPostRepositoty';

interface IProps {
   post: string;
}

@injectable()
export class CreatePostService {
   constructor(
      @inject('PrismaPost')
      private postRepository: IPostsRepository,

      @inject('Storage')
      private storage: IStorageProvider,
   ) {}

   async execute({ post }: IProps): Promise<string> {
      await this.storage.deleteFile(post, 'post');
      const res = await this.storage.saveFile(post, 'post');
      const url = `https://geb-app.s3.us-east-2.amazonaws.com/post/${res}`;
      return url;
   }
}
