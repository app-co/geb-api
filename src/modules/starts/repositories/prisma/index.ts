import { PrismaClient, Stars } from '@prisma/client';
import { IStarDto } from '@shared/dtos';

import { IStarRepository } from '../IStarRespository';

export class StarPrisma implements IStarRepository {
   private prisma = new PrismaClient();

   async create(data: IStarDto): Promise<Stars> {
      const create = await this.prisma.stars.create({
         data: {
            star: data.star,
            valiador: data.valiador,
            fk_id_user: data.fk_user_id,
         },
      });

      return create;
   }

   async listByUser_id(id: string): Promise<Stars[]> {
      const find = await this.prisma.stars.findMany({
         where: { fk_id_user: id },
      });

      return find;
   }
}
