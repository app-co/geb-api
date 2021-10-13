import { PrismaClient } from '@prisma/client';

import { Transaction } from '.prisma/client';

import { ITransactionDto } from '../Dtos/ITransactionDto';
import { ITransactionRepository } from './ITransactionRespository';

export class TransactionRepository implements ITransactionRepository {
   private prisma = new PrismaClient();

   async create(data: ITransactionDto): Promise<Transaction> {
      const create = await this.prisma.transaction.create({
         data: {
            consumidor_id: data.consumidor_id,
            prestador_id: data.prestador_id,
            descricao: data.descricao,
            valor: data.valor,
         },
      });

      return create;
   }

   async findById(id: string): Promise<Transaction | null> {
      const find = await this.prisma.transaction.findUnique({
         where: { id },
      });

      return find;
   }

   async findByConsumidor(id: string): Promise<Transaction[]> {
      const find = await this.prisma.transaction.findMany({
         where: { consumidor_id: id },
      });

      return find;
   }

   async findByPrestador(id: string): Promise<Transaction[]> {
      const find = await this.prisma.transaction.findMany({
         where: { prestador_id: id },
      });

      return find;
   }

   async delete(id: string): Promise<void> {
      await this.prisma.transaction.delete({
         where: { id },
      });
   }
}
