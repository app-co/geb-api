/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Err } from '@shared/errors/AppError';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { inject, injectable } from 'tsyringe';

import { PrismaClient, User } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface IUsers {
   logo: string;
}
@injectable()
export class UpdateLogoService {
   constructor(
      @inject('PrismaUser')
      private userRepostiroy: IUsersRepository,

      @inject('Storage')
      private storage: IStorageProvider,
   ) {}

   async execute({ logo }: IUsers): Promise<string> {
      await this.storage.deleteFile(logo, 'logo');
      const res = await this.storage.saveFile(logo, 'logo');
      const url = `https://geb-app.s3.us-east-2.amazonaws.com/logo/${res}`;
      return url;
   }
}
