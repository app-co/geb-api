import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { Profile } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateAvatar {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('Storage')
      private store: IStorageProvider,
   ) {}

   async execute(id: string, avatar: string): Promise<PRofile> {
      const user = await this.userRepository.findByIdProfile(id);

      if (!user) {
         throw new Err('Perfil não encontrado');
      }

      if (user?.avatarPath) {
         await this.store.deleteFile(user.avatarPath, 'avatar');
      }

      const av = await this.store.saveFile(avatar, 'avatar');

      const dados = {
         ...user,
         avatar: `http:/147.182.129.147/file/avatar/${av}`,
         avatarPath: av,
      };

      const prof = await this.userRepository.updateProfile(dados);
      return prof;
   }
}
