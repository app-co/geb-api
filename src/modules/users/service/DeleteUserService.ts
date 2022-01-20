/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { User } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface IPros {
   user_id: string;
}

@injectable()
export class DeleteUserService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({ user_id }: IPros): Promise<User> {
      const findId = await this.userRepository.findById(user_id);

      console.log('user', user_id);

      if (!findId) {
         throw new Err('usuário nao encontrado');
      }

      const user = await this.userRepository.deleteUser(user_id);

      return user;
   }
}
