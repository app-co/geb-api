/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Err } from '@shared/errors/AppError';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { inject, injectable } from 'tsyringe';

import { PrismaClient, User } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface IUsers {
   user_id: string;
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

   async execute({ user_id, logo }: IUsers): Promise<User> {
      const find = await this.userRepostiroy.findById(user_id);

      if (!find) {
         throw new Err('usuário nao encontrado');
      }

      if (find.avatar) {
         await this.storage.deleteFile(find.logotipo!, 'logo');
      }

      await this.storage.saveFile(logo, 'logo');

      const { user } = new PrismaClient();

      const updateLogo = await user.update({
         where: { id: find.id },
         data: { logotipo: logo },
      });

      return updateLogo;
   }
}
