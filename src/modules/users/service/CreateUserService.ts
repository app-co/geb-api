import { User } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
   nome: string;
   membro: string;
   senha: string;
   whats: string;
   workName: string;
   CNPJ: string;
   CPF: string;
   ramo: string;
   enquadramento: string;
   email: string;
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
      membro,
      senha,
      whats,
      workName,
      CNPJ,
      CPF,
      email,
      enquadramento,
      ramo,
      adm,
   }: Props): Promise<User> {
      const find = await this.userRepository.findByMembro(membro);

      if (find) {
         throw new Err('Esse membro já está cadastrado');
      }

      const has = await hash(senha, 8);
      console.log(has);

      const user = await this.userRepository.create({
         nome,
         membro,
         senha: has,
         whats,
         workName,
         CNPJ,
         CPF,
         email,
         ramo,
         enquadramento,
         adm,
      });

      return user;
   }
}
