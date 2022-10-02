/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { OrderTransaction } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { IConsumoRepository } from '../repositories/IConsumoRepository';

@injectable()
export class ListAllOrderService {
   constructor(
      @inject('PrismaConsumo')
      private consumoRepository: IConsumoRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(): Promise<OrderTransaction[]> {
      let find = await this.cache.recover<OrderTransaction[]>(
         'orderTransaction',
      );

      if (!find) {
         find = await this.consumoRepository.findAllOrder();

         await this.cache.save('orderTransaction', find);
         console.log('passou pelo banco');
      }

      return find;
   }
}
