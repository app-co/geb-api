import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

interface Props {
   id: string;
}

@injectable()
export class DeleteTransactionService {
   constructor(
      @inject('PrismaTransaction')
      private transactionRepository: ITransactionRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({ id }: Props): Promise<void> {
      const transaction = await this.transactionRepository.findTransactionById(
         id,
      );

      if (!transaction) {
         throw new Err('transação nao encontrada');
      }

      await this.transactionRepository.delete(transaction.id);

      await this.cache.invalidate('transaction');
      await this.cache.invalidatePrefix('transaction-prestador');
      await this.cache.invalidatePrefix('transaction-consumidor');

      await this.cache.invalidate('orderTransaction');
      await this.cache.invalidatePrefix(`order-transaction-consumidor`);
      await this.cache.invalidatePrefix('order-transaction-prestador');
   }
}
