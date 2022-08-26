/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { OrderTransaction } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IConsumoRepository } from '../repositories/IConsumoRepository';

interface IPros {
   id: string;
}

@injectable()
export class DeleteOrderService {
   constructor(
      @inject('PrismaConsumo')
      private orderRespository: IConsumoRepository,
   ) {}

   async execute({ id }: IPros): Promise<OrderTransaction> {
      const user = await this.orderRespository.deleteOrder(id);

      return user;
   }
}
