import { injectable } from 'tsyringe';

import { Consumo, PrismaClient } from '.prisma/client';

import { IConsumoDto } from '../Dtos/IConsumoDtos';
import { IConsumoRepository } from './IConsumoRepository';

export class ConsumoRepository implements IConsumoRepository {
   private prisma = new PrismaClient();

   async create(data: IConsumoDto): Promise<Consumo> {
      const consumo = await this.prisma.consumo.create({
         data: {
            presstador_id: data.prestador_id,
            consumidor_id: data.consumidor_id,
            type: data.type,
            valor: data.valor,
            descricao: data.descricao,
         },
      });

      return consumo;
   }

   async listByConsumo(user_id: string): Promise<Consumo[]> {
      const consumo = await this.prisma.consumo.findMany({
         where: { consumidor_id: user_id },
         include: { consumidor: true },
      });

      return consumo;
   }
}
