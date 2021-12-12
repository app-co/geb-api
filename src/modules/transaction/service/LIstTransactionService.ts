import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Transaction } from '.prisma/client';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

interface Props {
   id: string;
}

@injectable()
export class ListTransactionService {
   constructor(
      @inject('PrismaTransaction')
      private transactionRepository: ITransactionRepository,

      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({ id }: Props): Promise<Transaction[]> {
      const find = await this.transactionRepository.findByPrestador(id);
      // const consumidor = await this.userRepository.findById(consumidor_id);

      // if (!consumidor) {
      //    throw new Err('consumidor nao encontrado');
      // }

      // console.log(find);
      // if (!find) {
      //    throw new Err('transação nao encontrada');
      // }

      return find;
   }
}
