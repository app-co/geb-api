import { inject, injectable } from 'tsyringe';

import { Transaction } from '.prisma/client';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

@injectable()
export class ListAllTransaction {
   constructor(
      @inject('PrismaTransaction')
      private transactionRepository: ITransactionRepository,
   ) {}

   async execute(): Promise<Transaction[]> {
      const find = await this.transactionRepository.listAllTransaction();

      return find;
   }
}
