import { PrismaRelationship } from '@modules/relationship/repositories/prisma-relationship';
import { UsersRespository } from '@modules/users/repositories/UsersRespository';

import { IndicifualPontsService } from '../Pontos/IndividualPontsService';

export function makeUser() {
   const user = new UsersRespository();
   const relation = new PrismaRelationship();
   const selfPonts = new IndicifualPontsService(user, relation);

   return { selfPonts };
}
