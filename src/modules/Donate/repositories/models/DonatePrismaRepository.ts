/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Donate, Prisma } from '@prisma/client';
import { prisma } from 'utils/prisma';

import { IDonateRepository } from '../IRepository/IDonateRepository';

interface props {
   fk_id_user: string;
   itens: string[];
}

export class DonatePrismaRepository implements IDonateRepository {
   async validate(id: string): Promise<Donate> {
      const up = await prisma.donate.update({
         where: { id },
         data: {
            approved: true,
         },
      });

      return up;
   }

   async delete(id: string): Promise<void> {
      await prisma.donate.delete({ where: { id } });
   }

   public async create(data: props): Promise<Donate> {
      const create = await prisma.donate.create({ data });

      return create;
   }

   public async findById(id: string): Promise<Donate | null> {
      const list = await prisma.donate.findUnique({ where: { id } });

      return list;
   }

   public async listMany(): Promise<Donate[]> {
      const list = await prisma.donate.findMany();

      return list;
   }
}
