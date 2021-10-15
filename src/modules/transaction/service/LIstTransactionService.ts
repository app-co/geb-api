import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Transaction } from '.prisma/client';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

@injectable()
export class ListTransactionService {
   constructor(
      @inject('PrismaTransaction')
      private transactionRepository: ITransactionRepository,
   ) {}

   async execute(id: string): Promise<Transaction[]> {
      const find = await this.transactionRepository.findByPrestador(id);

      console.log(find);
      if (!find) {
         throw new Err('transação nao encontrada');
      }

      return find;
   }
}
