/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { User } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface IPros {
   membro: string;
}

@injectable()
export class DeleteUserService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({ membro }: IPros): Promise<User> {
      const findId = await this.userRepository.findByMembro(membro);

      if (!findId) {
         throw new Err('usuário nao encontrado');
      }

      const user = await this.userRepository.deleteUser(membro);
      await this.cache.invalidate('users');

      return user;
   }
}
