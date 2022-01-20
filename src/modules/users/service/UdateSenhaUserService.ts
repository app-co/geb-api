/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { User } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
   senha: string;
   id: string;
}

@injectable()
export class UpdateSenhaUserService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({ senha, id }: Props): Promise<User> {
      const findId = await this.userRepository.findById(id);

      if (!findId) {
         throw new Err('usuário nao encontrado');
      }

      console.log(id);

      const has = await hash(senha, 8);

      const user = await this.userRepository.updateSenha(has, id);

      return user;
   }
}
