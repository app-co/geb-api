import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Consumo } from '.prisma/client';

import { IConsumoRepository } from '../repositories/IConsumoRepository';

interface Props {
   user_id: string;
}

@injectable()
export class ListConsumoService {
   constructor(
      @inject('PrismaConsumo')
      private consumoRepository: IConsumoRepository,
   ) {}

   async execute(): Promise<Consumo[]> {
      const findConsumidor = await this.consumoRepository.listAll();

      if (!findConsumidor) {
         throw new Err('nenhum consumo disponivel');
      }

      return findConsumidor;
   }
}
