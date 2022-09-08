import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { B2b } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IB2bRepository } from '../repositories/IB2bRepository';

@injectable()
export class ListAllB2b {
   constructor(
      @inject('PrismaB2b')
      private b2bRepository: IB2bRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(): Promise<B2b[]> {
      let list = await this.cache.recover<B2b[]>('b2b');

      if (!list) {
         list = await this.b2bRepository.listAllB2b();

         await this.cache.save('b2b', list);
      }

      return list;
   }
}
