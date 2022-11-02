import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { Transaction } from '.prisma/client';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

@injectable()
export class ListAllTransaction {
   constructor(
      @inject('PrismaTransaction')
      private transactionRepository: ITransactionRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(): Promise<Transaction[]> {
      let tran = await this.cache.recover<Transaction[]>('transaction');

      if (!tran) {
         tran = await this.transactionRepository.listAllTransaction();
         await this.cache.save('transaction', tran);
      }

      const d = tran.map(h => {
         return {
            ...h,
            valor: h.valor / 100,
         };
      });

      const res = d.sort((a, b) => {
         return a.valor - b.valor;
      });

      return res;
   }
}
