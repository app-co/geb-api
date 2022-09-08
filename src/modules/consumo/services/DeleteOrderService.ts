/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { OrderTransaction } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IConsumoRepository } from '../repositories/IConsumoRepository';

interface IPros {
   id: string;
}

@injectable()
export class DeleteOrderService {
   constructor(
      @inject('PrismaConsumo')
      private orderRespository: IConsumoRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({ id }: IPros): Promise<OrderTransaction> {
      const user = await this.orderRespository.deleteOrder(id);

      await this.cache.invalidate('orderTransaction');
      await this.cache.invalidatePrefix('orderTransactionPres');
      await this.cache.invalidatePrefix('orderTransactionConsu');

      return user;
   }
}
