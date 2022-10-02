/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { OrderTransaction } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IOrderTransaction } from '@shared/dtos';
import { inject, injectable } from 'tsyringe';

import { IConsumoRepository } from '../repositories/IConsumoRepository';

@injectable()
export class FindOrderPrestador {
   constructor(
      @inject('PrismaConsumo')
      private consumoRepository: IConsumoRepository,

      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(prestador_id: string): Promise<OrderTransaction[]> {
      let find = await this.cache.recover<OrderTransaction[]>(
         `order-transaction-prestador${prestador_id}`,
      );

      if (!find) {
         find = await this.consumoRepository.findOrderPrestador(prestador_id);

         await this.cache.save(
            `order-transaction-prestador:${prestador_id}`,
            find,
         );
      }

      // await this.cache.invalidatePrefix(`orderTransactionPres:${prestador_id}`);

      return find;
   }
}
