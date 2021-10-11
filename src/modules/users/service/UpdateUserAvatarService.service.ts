import { Err } from '@shared/errors/AppError';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { inject, injectable } from 'tsyringe';

import { PrismaClient, User } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface IUsers {
   user_id: string;
   avatar: string;
}
@injectable()
export class UpdateUserAvatarService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('StorageProvider')
      private storage: IStorageProvider,
   ) {}

   async execute({ user_id, avatar }: IUsers): Promise<User> {
      const find = await this.userRepository.findById(user_id);

      if (!find) {
         throw new Err('user not found');
      }
      if (find.avatar) {
         await this.storage.deleteFile(find.avatar, 'avatar');
      }

      await this.storage.saveFile(avatar, 'avatar');

      const { user } = new PrismaClient();
      const updateAvatar = await user.update({
         where: { id: find.id },
         data: { avatar },
      });

      return updateAvatar;
   }
}
