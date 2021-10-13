import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

@injectable()
export class DeleteTransactionService {
   constructor(
      @inject('PrismaTransaction')
      private transactionRepository: ITransactionRepository,
   ) {}

   async execute(id: string): Promise<void> {
      const transaction = await this.transactionRepository.findById(id);

      if (!transaction) {
         throw new Err('transação nao encontrada');
      }

      await this.transactionRepository.delete(transaction.id);
   }
}
