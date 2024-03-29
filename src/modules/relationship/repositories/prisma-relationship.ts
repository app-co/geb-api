import { RelationShip } from '@prisma/client';

import { prisma } from '../../../utils/prisma';
import { IRelationship, IRelationshipUpdate } from '../dtos';
import { IRepoRelationship } from './repo-relationship';

export class PrismaRelationship implements IRepoRelationship {
   async listValidated(): Promise<RelationShip[]> {
      const list = await prisma.relationShip.findMany({
         where: { situation: true },
      });

      return list;
   }

   async listPending(): Promise<RelationShip[]> {
      const list = await prisma.relationShip.findMany({
         where: { situation: false },
      });

      return list;
   }

   async create(data: IRelationship): Promise<RelationShip> {
      const create = await prisma.relationShip.create({ data });

      return create;
   }

   async delete(id: string): Promise<void> {
      await prisma.relationShip.delete({ where: { id } });
   }

   async update(data: IRelationshipUpdate): Promise<RelationShip> {
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

   async listByPrestador(prestador_id: string): Promise<RelationShip[]> {
      const fin = await prisma.relationShip.findMany({
         where: { prestador_id },
      });
      return fin;
   }

   async listByClient(client_id: string): Promise<RelationShip[]> {
      const fin = await prisma.relationShip.findMany({
         where: { client_id },
      });
      return fin;
   }

   async findById(id: string): Promise<RelationShip | null> {
      const find = await prisma.relationShip.findFirst({ where: { id } });
      return find;
   }
}
