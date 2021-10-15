import { inject, injectable } from 'tsyringe';

import { Transaction } from '.prisma/client';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

interface Props {
   prestador_id: string;
   consumidor_id: string;
   valor: string;
   descricao: string;
}

@injectable()
export class CreateTransactionService {
   constructor(
      @inject('PrismaTransaction')
      private transactionRepository: ITransactionRepository,
   ) {}

   async execute({
      prestador_id,
      consumidor_id,
      valor,
      descricao,
   }: Props): Promise<Transaction> {
      console.log(descricao);
      const create = this.transactionRepository.create({
         prestador_id,
         consumidor_id,
         valor,
         descricao,
      });

      return create;
   }
}
