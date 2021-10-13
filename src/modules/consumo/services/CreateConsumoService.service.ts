import { inject, injectable } from 'tsyringe';

import { IConsumoRepository } from '../repositories/IConsumoRepository';
import { IConsumoDto } from '../Dtos/IConsumoDtos';

import { Consumo } from '.prisma/client';

// interface Props {
//    prestador_id: string;
//    consumidor_id: string;
//    valor: string;
//    type: string;
// }

@injectable()
export class CreateConsumoService {
   constructor(
      @inject('PrismaConsumo')
      private consumoRepository: IConsumoRepository,
   ) {}

   async execute(data: IConsumoDto): Promise<Consumo> {
      const consumo = await this.consumoRepository.create({
         consumidor_id: data.consumidor_id,
         type: data.type,
         prestador_id: data.prestador_id,
         descricao: data.descricao,
         valor: data.valor,
      });

      return consumo;
   }
}
