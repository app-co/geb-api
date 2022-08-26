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
   ) {}

   async execute({ id }: Props): Promise<Transaction[]> {
      const find = await this.transactionRepository.findByPrestador(id);

      return find;
   }
}
