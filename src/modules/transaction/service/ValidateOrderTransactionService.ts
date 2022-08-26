import { IConsumoRepository } from '@modules/consumo/repositories/IConsumoRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { IOrderTransaction } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Transaction } from '.prisma/client';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

interface Props {
   order_id: string;
   user_id: string;
}

@injectable()
export class ValidateOrderTransactionService {
   constructor(
      @inject('PrismaTransaction')
      private transactionRepository: ITransactionRepository,

      @inject('PrismaConsumo')
      private orderRepository: IConsumoRepository,

      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({ order_id, user_id }: Props): Promise<Transaction> {
      const find = await this.orderRepository.findOrderById(order_id);
      const user = await this.userRepository.findById(user_id);

      if (!user) {
         throw new Err('Prestador não encontrado');
      }

      if (!find) {
         throw new Err('Ordem não encontrada');
      }

      if (user.id !== find.prestador_id) {
         throw new Err('Você não tem acesso a essa order', 401);
      }

      const order = await this.orderRepository.deleteOrder(order_id);

      const {
         consumidor_id,
         consumidor_name,
         prestador_name,
         prestador_id,
         descricao,
         valor,
      } = order;

      const create = this.transactionRepository.create({
         consumidor_id,
         consumidor_name,
         prestador_name,
         prestador_id,
         valor,
         descricao,
      });

      return create;
   }
}
