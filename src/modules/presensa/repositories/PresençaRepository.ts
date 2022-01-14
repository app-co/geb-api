import { Presenca } from '@prisma/client';

import { PrismaClient } from '.prisma/client';

import { IPresencaDto } from '../Dtos/IPresençaDto';
import { IPresencaRespository } from './IPresençaRepository';

export class PresencaRepository implements IPresencaRespository {
   prisma = new PrismaClient();

   async create(data: IPresencaDto): Promise<Presenca> {
      const create = await this.prisma.presenca.create({
         data: {
            user_id: data.user_id,
         },
      });

      return create;
   }

   async update(id: string, presenca: boolean): Promise<Presenca> {
      const up = await this.prisma.presenca.update({
         where: { id },
         data: {
            presenca,
         },
      });

      return up;
   }

   async list(user_id: string): Promise<Presenca[]> {
      const criate = await this.prisma.presenca.findMany({
         where: { user_id },
         include: { user: true },
      });

      return criate;
   }

   async listAll(): Promise<Presenca[]> {
      const criate = await this.prisma.presenca.findMany({
         include: { user: true },
      });

      return criate;
   }
}
