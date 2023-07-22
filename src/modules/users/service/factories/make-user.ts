import { PrismaRelationship } from '@modules/relationship/repositories/prisma-relationship';
import { UsersRespository } from '@modules/users/repositories/UsersRespository';

import { GlobalPontsService } from '../Pontos/GlobalPontsService';
import { IndicifualPontsService } from '../Pontos/IndividualPontsService';

export function makeUser() {
   const user = new UsersRespository();
   const relation = new PrismaRelationship();
   const selfPonts = new IndicifualPontsService(user, relation);
   const globalPonts = new GlobalPontsService(user, relation);

   return { selfPonts, globalPonts };
}
