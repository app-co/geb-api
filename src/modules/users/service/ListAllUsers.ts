import { User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
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
      let users = await this.cache.recover<User[]>('list-all-users');

      if (!users) {
         users = await this.userRepository.listAllUser();
         console.log('banco');

         await this.cache.save(`list-all-users`, users);
      }

      const lis = users.sort((a, b) => {
         if (a.nome > b.nome) {
            return -0;
         }
         return -1;
      });

      return lis;
   }
}
