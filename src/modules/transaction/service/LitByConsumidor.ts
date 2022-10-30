/* eslint-disable @typescript-eslint/no-unused-vars */
import { Transaction } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

interface Props {
   id: string;
}

@injectable()
export class ListByConsumidor {
   constructor(
      @inject('PrismaTransaction')
      private transactionRepository: ITransactionRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({ id }: Props): Promise<Transaction[]> {
      let find = await this.cache.recover<Transaction[]>(
         `transaction-consumidor:${id}`,
      );

      if (!find) {
         find = await this.transactionRepository.findByConsumidor(id);
         await this.cache.save(`transaction-consumidor:${id}`, find);
         console.log('listconsumidor: passou pelo banco');
      }
      const bp = find.map(h => {
         return {
            ...h,
            valor: h.valor / 100,
         };
      });

      return bp;
   }
}
