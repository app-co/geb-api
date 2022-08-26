import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Transaction } from '.prisma/client';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

interface Props {
   id: string;
}

@injectable()
export class FindTransactionById {
   constructor(
      @inject('PrismaTransaction')
      private transactionRepository: ITransactionRepository,
   ) {}

   async execute({ id }: Props): Promise<Transaction> {
      const find = await this.transactionRepository.findTransactionById(id);

      if (!find) {
         throw new Err('transação nao encontrada');
      }

      return find;
   }
}
