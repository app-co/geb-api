import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { B2b } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IB2bRepository } from '../repositories/IB2bRepository';

@injectable()
export class DeleteB2b {
   constructor(
      @inject('PrismaB2b')
      private b2bRepository: IB2bRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(id: string): Promise<B2b> {
      const find = await this.b2bRepository.findById(id);

      if (!find) {
         throw new Err('b2b nao encontrado');
      }
      const del = await this.b2bRepository.deleteB2bById(id);

      await this.cache.invalidate('b2b');
      await this.cache.invalidatePrefix('b2bSend');
      await this.cache.invalidatePrefix('b2bReci');
      await this.cache.invalidatePrefix('individualPonts');

      return del;
   }
}
