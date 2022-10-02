import { OrderTransaction } from '@prisma/client';
import { IOrderTransaction } from '@shared/dtos';

import { Consumo, PrismaClient } from '.prisma/client';

import { IConsumoRepository } from './IConsumoRepository';

export class ConsumoRepository implements IConsumoRepository {
   private prisma = new PrismaClient();

   //* * Orders */

   async create(data: IOrderTransaction): Promise<OrderTransaction> {
      const consumo = await this.prisma.orderTransaction.create({
         data: {
            prestador_id: data.prestador_id,
            consumidor_id: data.consumidor_id,
            consumidor_name: data.consumidor_name,
            prestador_name: data.prestador_name,
            valor: data.valor,
            descricao: data.descricao,
         },
      });

      return consumo;
   }

   async findOrderPrestador(user_id: string): Promise<OrderTransaction[]> {
      const consumo = await this.prisma.orderTransaction.findMany({
         where: { prestador_id: user_id },
      });

      return consumo;
   }

   async findAllOrder(): Promise<OrderTransaction[]> {
      const list = await this.prisma.orderTransaction.findMany();
      return list;
   }

   async findOrderById(id: string): Promise<OrderTransaction | null> {
      const find = await this.prisma.orderTransaction.findUnique({
         where: { id },
      });

      return find;
   }

   async deleteOrder(id: string): Promise<void> {
      await this.prisma.orderTransaction.delete({ where: { id } });
   }

   async listAll(): Promise<Consumo[]> {
      const find = await this.prisma.consumo.findMany();
      return find;
   }

   async findOrderConsumidor(
      consumidor_id: string,
   ): Promise<OrderTransaction[]> {
      const consumo = await this.prisma.orderTransaction.findMany({
         where: { consumidor_id },
      });

      return consumo;
   }
}
