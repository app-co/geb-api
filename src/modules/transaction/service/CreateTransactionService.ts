import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Transaction } from '.prisma/client';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

interface Props {
   consumidor_id: string;
   prestador_id: string;

   valor: string;
   descricao: string;
   nome: string;
}

@injectable()
export class CreateTransactionService {
   constructor(
      @inject('PrismaTransaction')
      private transactionRepository: ITransactionRepository,
   ) {}

   async execute({
      consumidor_id,
      valor,
      descricao,
      prestador_id,
      nome,
   }: Props): Promise<Transaction> {
      const create = this.transactionRepository.create({
         consumidor_id,
         prestador_id,
         valor,
         descricao,
         nome,
      });

      return create;
   }
}
