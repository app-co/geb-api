/* eslint-disable import/no-extraneous-dependencies */
import { IB2b } from '@shared/dtos';

import { B2b, PrismaClient } from '.prisma/client';

import { IB2bRepository } from './IB2bRepository';

export class B2bRepository implements IB2bRepository {
   private prisma = new PrismaClient();

   async create({
      recevid_id,
      appointment,
      recevid_name,
      send_id,
      send_name,
      assunto,
      validate,
   }: IB2b): Promise<B2b> {
      const create = this.prisma.b2b.create({
         data: {
            recevid_id,
            recevid_name,
            send_name,
            send_id,
            appointment,
            assunto,
            validate,
         },
      });

      return create;
   }

   async listAllB2b(): Promise<B2b[]> {
      const list = await this.prisma.b2b.findMany();
      return list;
   }

   async findById(id: string): Promise<B2b | null> {
      const find = await this.prisma.b2b.findFirst({ where: { id } });
      return find;
   }

   async validate(id: string): Promise<B2b> {
      const vali = await this.prisma.b2b.update({
         where: { id },
         data: { validate: true },
      });

      return vali;
   }

   async findB2bBySendId(send_id: string): Promise<B2b[]> {
      const find = await this.prisma.b2b.findMany({
         where: { send_id },
      });

      return find;
   }

   async findB2bByRecevidId(recevid_id: string): Promise<B2b[]> {
      const find = await this.prisma.b2b.findMany({
         where: { recevid_id },
      });

      return find;
   }

   async deleteB2bById(id: string): Promise<B2b> {
      const del = await this.prisma.b2b.delete({ where: { id } });
      return del;
   }
}
