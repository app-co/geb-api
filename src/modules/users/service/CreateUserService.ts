import { User } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

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
}

@injectable()
export class CreateUserService {
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
   }: Props): Promise<User> {
      const find = await this.userRepository.findByMembro(membro);

      if (find) {
         throw new Err('Esse membro já está cadastrado');
      }

      const has = await hash(senha, 8);

      const user = await this.userRepository.create({
         nome,
         sobrenome,
         membro,
         senha: has,
         whats,
         workName,
         CNPJ,
         adm,
      });

      return user;
   }
}
