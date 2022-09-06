import { Profile } from '@prisma/client';
import { IProfileDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
   whats: string;
   workName: string;
   CNPJ: string;
   CPF: string;
   email: string;
   enquadramento: string;
   ramo: string;
   user_id: string;
   whatsApp: string;
   insta: string;
   web: string;
   face: string;
}

@injectable()
export class CreateProfi {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({
      user_id,
      whats,
      workName,
      CNPJ,
      CPF,
      email,
      ramo,
      enquadramento,
      whatsApp,
      web,
      insta,
      face,
   }: Props): Promise<Profile> {
      const user = await this.userRepository.findById(user_id);
      const profile = await this.userRepository.findByIdProfile(user_id);

      console.log(insta);

      // if (profile) {
      //    throw new Err('profile ja criado');
      // }

      if (!user) {
         throw new Err('Usuário não encontrado');
      }

      const create = await this.userRepository.createProfile(
         {
            whats,
            workName,
            CNPJ,
            CPF,
            email,
            enquadramento,
            ramo,
            user_id,
         },
         whatsApp,
         insta,
         web,
         face,
      );

      return create;
   }
}
