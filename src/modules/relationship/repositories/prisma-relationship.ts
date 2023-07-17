import { RelationShip } from '@prisma/client';
import { prisma } from '@utils/prisma';

import { IRelashionship, IRelashionshipUpdate } from '../dtos';
import { IRepoRelationship } from './repo-relationship';

export class PrismaRelationship implements IRepoRelationship {
   async create(data: IRelashionship): Promise<RelationShip> {
      const create = await prisma.relationShip.create({ data });

      return create;
   }

   async delete(id: string): Promise<void> {
      await prisma.relationShip.delete({ where: { id } });
   }

   async update(data: IRelashionshipUpdate): Promise<RelationShip> {
      const up = await prisma.relationShip.update({
         where: { id: data.id },
         data,
      });

      return up;
   }

   async listAll(): Promise<RelationShip[]> {
      const lis = await prisma.relationShip.findMany();
      return lis;
   }

   async listByMembro(membro: string): Promise<RelationShip[]> {
      const fin = await prisma.relationShip.findMany({
         where: { membro_id: membro },
      });
      return fin;
   }

   async listByUserId(fk_user_id: string): Promise<RelationShip[]> {
      const fin = await prisma.relationShip.findMany({
         where: { fk_user_id },
      });
      return fin;
   }

   async findById(id: string): Promise<RelationShip | null> {
      const find = await prisma.relationShip.findFirst({ where: { id } });
      return find;
   }
}
