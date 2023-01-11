/* eslint-disable @typescript-eslint/no-unused-vars */
import { Profile, User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IUserDtos, IProfileDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

@injectable()
export class ListAllUser {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(): Promise<User[]> {
      let users = await this.cache.recover<User[]>('users');

      if (!users) {
         users = await this.userRepository.listAllUser();

         await this.cache.save(`users`, users);

         console.log('banco list all users');
      }

      const us = users.sort((a, b) => {
         if (a.nome > b.nome) {
            return -0;
         }
         return -1;
      });

      return users;
   }
}
