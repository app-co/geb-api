/* eslint-disable @typescript-eslint/no-unused-vars */
import { Profile } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IProfileDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRespository';

@injectable()
export class UpdateProfileService {
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
   }: IProfileDto): Promise<Profile> {
      const user = await this.userRepository.findById(fk_id_user);
      const profile = await this.userRepository.findByIdProfile(fk_id_user);

      if (!profile) {
         throw new Err('Você ainda não possui um perfil');
      }

      if (!user) {
         throw new Err('Usuário não encontrado');
      }

      const create = await this.userRepository.updateProfile({
         id: profile.id,
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
      await this.cache.invalidate('padrinho');

      return create;
   }
}
