/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Links, Prisma } from '@prisma/client';
import { ILikeDto, ILinkDto } from '@shared/dtos';

import { prisma } from '../../../../utils/prisma';
import { ILinksRepository } from '../IRepository/ILinksRepository';

export class LinksPrismaRepository implements ILinksRepository {
   public async create(data: ILinkDto): Promise<Links> {
      const create = await prisma.links.create({
         data: {
            nome: data.nome,
            link: data.link,
            user_id: data.user_id,
         },
      });

      return create;
   }

   public async findByName(name: string): Promise<Links | null> {
      const list = await prisma.links.findFirst({ where: { nome: name } });

      return list;
   }

   public async listByUser(user_id: string): Promise<Links[]> {
      const list = await prisma.links.findMany({
         where: {
            user_id,
         },
      });

      return list;
   }
}
