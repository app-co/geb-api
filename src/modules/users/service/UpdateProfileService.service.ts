import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { User } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
   nome: string;
   sobrenome: string;
   membro: string;
   senha: string;
   whats: number;
   workName: string;
   CNPJ: number;
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
      sobrenome,
      membro,
      senha,
      whats,
      workName,
      CNPJ,
      adm,
      id,
   }: Props): Promise<User> {
      const findMembro = await this.userRepository.findByMembro(membro);
      const findId = await this.userRepository.findById(id);

      if (findMembro && findId?.membro !== membro) {
         throw new Err('Esse membro já está cadastrado');
      }

      const has = await hash(senha, 8);

      const user = await this.userRepository.update(
         {
            nome,
            sobrenome,
            membro,
            senha: has,
            whats,
            workName,
            CNPJ,
            adm,
         },
         id,
      );

      return user;
   }
}
