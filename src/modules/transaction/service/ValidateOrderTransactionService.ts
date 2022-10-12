/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IConsumoRepository } from '@modules/consumo/repositories/IConsumoRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { OrderTransaction } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IOrderTransaction } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Transaction } from '.prisma/client';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

interface Props {
   consumidor_id: string;
   consumidor_name: string;
   prestador_name: string;
   prestador_id: string;
   descricao: string;
   valor: number;
   order_id?: string;
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

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({
      consumidor_id,
      consumidor_name,
      descricao,
      prestador_id,
      prestador_name,
      valor,
      order_id,
      user_id,
   }: Props): Promise<Transaction> {
      const user = await this.userRepository.findById(user_id);

      if (!user) {
         throw new Err('Prestador não encontrado');
      }

      let dados = {
         consumidor_id,
         consumidor_name,
         prestador_name,
         prestador_id,
         valor,
         descricao,
      };

      if (order_id) {
         const findP = await this.orderRepository.findOrderById(order_id);

         if (!findP) {
            throw new Err('Ordem não encontrada');
         }

         if (user.id !== findP.prestador_id) {
            throw new Err('Você não tem acesso a essa order', 401);
         }

         dados = findP;

         await this.orderRepository.deleteOrder(findP.id);
      }

      const create = this.transactionRepository.create(dados);

      await this.cache.invalidate('transaction');
      await this.cache.invalidatePrefix('transaction-prestador');
      await this.cache.invalidatePrefix('transaction-consumidor');

      await this.cache.invalidate('orderTransaction');
      await this.cache.invalidatePrefix(`order-transaction-consumidor`);
      await this.cache.invalidatePrefix('order-transaction-prestador');

      await this.cache.invalidatePrefix(`individualPonts`);

      return create;
   }
}
