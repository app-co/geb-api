import { B2bRepository } from '@modules/B2b/repositories/B2bRepository';
import { ConsumoRepository } from '@modules/consumo/repositories/ConsumoRepository';
import { ConvidadoPrisma } from '@modules/convidado/repositories/prisma';
import { DonatePrismaRepository } from '@modules/Donate/repositories/models/DonatePrismaRepository';
import { IndicationRepository } from '@modules/indication/infra/repositories/IndicationRepository';
import { PresencaRepository } from '@modules/presensa/repositories/PresençaRepository';
import { PrismaRelationship } from '@modules/relationship/repositories/prisma-relationship';
import { TransactionRepository } from '@modules/transaction/repositories/TransactionRepository';
import { UsersRespository } from '@modules/users/repositories/UsersRespository';
import RedisCacheProvider from '@shared/container/providers/implementations/RedisCachProvider';

import { UseCasesRelationship } from '../use-case-relationship';

export function makeRelationship() {
   const repo = new PrismaRelationship();
   const repoUser = new UsersRespository();
   const cashe = new RedisCacheProvider();

   const make = new UseCasesRelationship(repo, repoUser, cashe);

   return make;
}
