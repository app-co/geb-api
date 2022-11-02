import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { Profile } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import IStorageProvider from '@shared/StorageProvider/models/IStorageProviders';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UpdateLogo {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('Storage')
      private store: IStorageProvider,
   ) {}

   async execute(id: string, logo: string): Promise<Profile> {
      const user = await this.userRepository.findByIdProfile(id);

      if (!user) {
         throw new Err('Perfil não encontrado');
      }

      if (user?.logoPath) {
         await this.store.deleteFile(user.logoPath, 'logo');
      }

      const av = await this.store.saveFile(logo, 'logo');

      const dados = {
         ...user,
         logotipo: `http://192.168.5.124:3333/file/logo/${av}`,
         logoPath: av,
      };

      const prof = await this.userRepository.updateProfile(dados);
      console.log(prof);
      return prof;
   }
}
