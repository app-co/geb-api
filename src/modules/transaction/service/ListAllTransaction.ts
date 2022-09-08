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
         console.log('listalltransaction: transaction');
         await this.cache.save('transaction', tran);
      }

      return tran;
   }
}
