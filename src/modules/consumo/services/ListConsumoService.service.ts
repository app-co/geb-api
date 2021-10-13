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

   async execute({ user_id }: Props): Promise<Consumo[]> {
      const find = await this.consumoRepository.listByConsumo(user_id);

      if (!find) {
         throw new Err('nenhum consumo disponivel');
      }

      return find;
   }
}
