/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { Transaction } from '.prisma/client';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

interface Props {
   id: string;
}

@injectable()
export class ListByPrestador {
   constructor(
      @inject('PrismaTransaction')
      private transactionRepository: ITransactionRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({ id }: Props): Promise<Transaction[]> {
      let find = await this.cache.recover<Transaction[]>(
         `transaction-prestador:${id}`,
      );

      if (!find) {
         find = await this.transactionRepository.findByPrestador(id);
         await this.cache.save(`transaction-prestador:${id}`, find);
         console.log('list transaction by prestador: passou pelo banco');
      }

      return find;
   }
}
