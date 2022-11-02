/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { OrderTransaction } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { IConsumoRepository } from '../repositories/IConsumoRepository';

@injectable()
export class FindOrderConsumidor {
   constructor(
      @inject('PrismaConsumo')
      private consumoRepository: IConsumoRepository,

      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(consumidor_id: string): Promise<OrderTransaction[]> {
      let find = await this.cache.recover<OrderTransaction[]>(
         `order-transaction-consumidor:${consumidor_id}`,
      );

      if (!find) {
         find = await this.consumoRepository.findOrderConsumidor(consumidor_id);

         await this.cache.save(
            `order-transaction-consumidor:${consumidor_id}`,
            find,
         );
      }

      return find;
   }
}
