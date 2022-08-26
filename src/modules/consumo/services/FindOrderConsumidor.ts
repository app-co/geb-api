/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { OrderTransaction } from '@prisma/client';
import { IOrderTransaction } from '@shared/dtos';
import { inject, injectable } from 'tsyringe';

import { IConsumoRepository } from '../repositories/IConsumoRepository';

@injectable()
export class FindOrderConsumidor {
   constructor(
      @inject('PrismaConsumo')
      private consumoRepository: IConsumoRepository,

      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute(consumidor_id: string): Promise<OrderTransaction[]> {
      const find = await this.consumoRepository.findOrderConsumidor(
         consumidor_id,
      );

      return find;
   }
}
