/* eslint-disable @typescript-eslint/no-unused-vars */
import { Profile } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IProfileDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRespository';

interface Props {
   whats: string;
   workName: string;
   CNPJ: string;
   CPF: string;
   email: string;
   enquadramento: string;
   ramo: string;
   logo: string;
   avatar: string;
   fk_id_user: string;
}

@injectable()
export class CreateProfi {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({
      fk_id_user,
      whats,
      workName,
      CNPJ,
      CPF,
      email,
      ramo,
      enquadramento,
      logo,
      avatar,
   }: Props): Promise<Profile> {
      console.log(fk_id_user);
      const user = await this.userRepository.findById(fk_id_user);
      const profile = await this.userRepository.findByIdProfile(fk_id_user);

      if (profile) {
         throw new Err('profile ja criado');
      }

      if (!user) {
         throw new Err('Usuário não encontrado');
      }

      const create = await this.userRepository.createProfile({
         whats,
         workName,
         CNPJ,
         CPF,
         email,
         enquadramento,
         ramo,
         fk_id_user,
         logo,
         avatar,
      });
      await this.cache.invalidate('users');

      await this.cache.invalidate('profile');

      return create;
   }
}
