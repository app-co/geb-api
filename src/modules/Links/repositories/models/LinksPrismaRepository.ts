/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Links, Prisma, midia } from '@prisma/client';
import { ILikeDto, ILinkDto } from '@shared/dtos';

import { prisma } from '../../../../utils/prisma';
import { ILinksRepository } from '../IRepository/ILinksRepository';

export class LinksPrismaRepository implements ILinksRepository {
   public async create(data: ILinkDto): Promise<midia> {
      const create = await prisma.midia.create({
         data: {
            nome: data.nome,
            link: data.link,
            fk_user_id: data.fk_user_id,
         },
      });

      return create;
   }

   public async findByName(name: string): Promise<midia | null> {
      const list = await prisma.midia.findFirst({ where: { nome: name } });

      return list;
   }

   public async listByUser(fk_user_id: string): Promise<midia[]> {
      const list = await prisma.midia.findMany({
         where: {
            fk_user_id,
         },
      });

      return list;
   }
}
