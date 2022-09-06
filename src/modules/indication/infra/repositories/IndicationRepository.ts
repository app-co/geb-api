import { Indication } from '@prisma/client';
import { IIndicationDto } from '@shared/dtos';

import { PrismaClient } from '.prisma/client';

import { IIndicationRepository } from './IIndicationRepository';

export class IndicationRepository implements IIndicationRepository {
   private prisma = new PrismaClient();

   async create(data: IIndicationDto): Promise<Indication> {
      const create = await this.prisma.indication.create({
         data: {
            indicado_id: data.indicado_id,
            indicado_name: data.indicado_name,
            quemIndicou_id: data.quemIndicou_id,
            quemIndicou_name: data.quemIndicou_name,
            client_name: data.client_name,
            phone_number_client: data.phone_number_client,
            description: data.description,
         },
      });

      return create;
   }

   async findByIndicado(id: string): Promise<Indication[]> {
      const find = await this.prisma.indication.findMany({
         where: { indicado_id: id },
      });

      return find;
   }

   async findByQuemIndicou(id: string): Promise<Indication[]> {
      const find = await this.prisma.indication.findMany({
         where: { quemIndicou_id: id },
      });

      return find;
   }

   async findById(id: string): Promise<Indication | null> {
      const find = await this.prisma.indication.findUnique({
         where: { id },
      });

      return find;
   }

   async listAll(): Promise<Indication[]> {
      const find = await this.prisma.indication.findMany();
      return find;
   }

   async delete(id: string): Promise<Indication> {
      const del = await this.prisma.indication.delete({
         where: { id },
      });
      return del;
   }

   async validate(id: string): Promise<Indication> {
      const up = await this.prisma.indication.update({
         where: {
            id,
         },
         data: {
            validate: true,
         },
      });

      return up;
   }
}
