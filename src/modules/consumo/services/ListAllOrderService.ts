/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { OrderTransaction } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { IConsumoRepository } from '../repositories/IConsumoRepository';

@injectable()
export class ListAllOrderService {
   constructor(
      @inject('PrismaConsumo')
      private consumoRepository: IConsumoRepository,
   ) {}

   async execute(): Promise<OrderTransaction[]> {
      const find = await this.consumoRepository.findAllOrder();

      return find;
   }
}
