import { inject, injectable } from 'tsyringe';

import { Transaction } from '.prisma/client';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

interface Props {
   id: string;
}

@injectable()
export class ListByConsumidor {
   constructor(
      @inject('PrismaTransaction')
      private transactionRepository: ITransactionRepository,
   ) {}

   async execute({ id }: Props): Promise<Transaction[]> {
      const find = await this.transactionRepository.findByConsumidor(id);

      return find;
   }
}
