import { Convidado, PrismaClient } from '@prisma/client';
import { IConvidadoDto } from '@shared/dtos';

import { IConvidadoPrisma } from '../IConvidadoPrisma';

export class ConvidadoPrisma implements IConvidadoPrisma {
   private prisma = new PrismaClient();

   async create(data: IConvidadoDto): Promise<Convidado> {
      const create = await this.prisma.convidado.create({
         data: {
            fk_user_id: data.fk_user_id,
            name_convidado: data.name_convidado,
         },
      });

      return create;
   }

   async listAll(): Promise<Convidado[]> {
      const find = await this.prisma.convidado.findMany({
         include: { user: true },
      });

      return find;
   }

   async update(id: string, approved: boolean): Promise<Convidado> {
      const up = await this.prisma.convidado.update({
         where: { id },
         data: {
            approved,
         },
      });

      return up;
   }
}
