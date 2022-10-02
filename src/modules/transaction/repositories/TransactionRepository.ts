/* eslint-disable import/no-extraneous-dependencies */
import { PrismaClient } from '@prisma/client';
import { IOrderTransaction, ITransaction } from '@shared/dtos';

import { Transaction } from '.prisma/client';

import { ITransactionRepository } from './ITransactionRespository';

export class TransactionRepository implements ITransactionRepository {
   private prisma = new PrismaClient();

   async create(data: ITransaction): Promise<Transaction> {
      const create = await this.prisma.transaction.create({
         data: {
            consumidor_id: data.consumidor_id,
            consumidor_name: data.consumidor_name,
            prestador_id: data.prestador_id,
            prestador_name: data.prestador_name,
            descricao: data.descricao,
            valor: data.valor,
         },
      });

      return create;
   }

   async findTransactionById(id: string): Promise<Transaction | null> {
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

   async listAllTransaction(): Promise<Transaction[]> {
      const list = await this.prisma.transaction.findMany();

      return list;
   }

   async delete(id: string): Promise<void> {
      await this.prisma.transaction.delete({
         where: { id },
      });
   }
}
