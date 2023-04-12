import { ISituationDto } from '@modules/situation/dtos';
import { PrismaClient, SituationUser } from '@prisma/client';

import { ISituationPrisma } from '../ISituationPrisma';

export class SituationPrisma implements ISituationPrisma {
   private prisma = new PrismaClient();

   async update(data: ISituationDto): Promise<SituationUser> {
      const create = await this.prisma.situationUser.update({
         where: { fk_id_user: data.fk_id_user },
         data: {
            apadrinhado: data.apadrinhado,
            firstLogin: data.firstLogin,
            inativo: data.inativo,
            logado: data.logado,
         },
      });

      return create;
   }
}
