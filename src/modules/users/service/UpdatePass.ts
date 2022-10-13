import { PrismaClient, User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
   nome: string;
   membro: string;
   senha: string;
   adm: boolean;
}

@injectable()
export class UpdateSenha {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({ membro, senha, adm }: Props): Promise<User> {
      const find = await this.userRepository.findByMembro(membro);

      console.log(membro);
      if (!find) {
         throw new Err('Membro nao encontrado');
      }

      const has = await hash(senha, 8);

      const data = {
         nome: find.nome,
         membro,
         senha: has,
         adm: find.adm,
      };

      const user = await this.userRepository.updateUser(data, find.id);

      return user;
   }
}
