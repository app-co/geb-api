/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { User } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
   token: string;
   id: string;
}

@injectable()
export class UpdateUserTokenService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({ token, id }: Props): Promise<User> {
      const findId = await this.userRepository.findById(id);

      if (!findId) {
         throw new Err('usuário nao encontrado');
      }

      const user = await this.userRepository.updateToken(id, token);

      return user;
   }
}
