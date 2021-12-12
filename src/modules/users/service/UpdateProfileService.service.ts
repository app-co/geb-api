/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { User } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
   nome: string;
   membro: string;
   whats: string;
   workName: string;
   CNPJ: string;
   CPF: string;
   ramo: string;
   enquadramento: string;
   email: string;
   links: [];
   adm: boolean;
   id: string;
}

@injectable()
export class UpdateProfileService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({
      nome,
      membro,
      whats,
      workName,
      CNPJ,
      CPF,
      email,
      links,
      ramo,
      enquadramento,
      adm,
      id,
   }: Props): Promise<User> {
      const findMembro = await this.userRepository.findByMembro(membro);
      const findId = await this.userRepository.findById(id);

      if (findMembro && findId?.membro !== membro) {
         throw new Err('Esse membro já está cadastrado');
      }

      const user = await this.userRepository.update(
         {
            nome,
            membro,
            whats,
            workName,
            CNPJ,
            CPF,
            email,
            links,
            ramo,
            enquadramento,
            adm,
         },
         id,
      );

      return user;
   }
}
