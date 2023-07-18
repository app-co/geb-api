/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRelashionship } from '@modules/relationship/dtos';
import { IRepoRelationship } from '@modules/relationship/repositories/repo-relationship';
import {
   Profile,
   Transaction,
   User,
   Presenca,
   Indication,
   B2b,
   Padrinho,
   Convidado,
   Donate,
} from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { pontos as ponts } from '../../../../utils/pontos';
import { IUsersRepository } from '../../repositories/IUsersRespository';

interface Props {
   compras: Tips[];
   vendas: Tips[];
   presenca: Tips[];
   indication: Tips[];
   b2b: Tips[];
}

interface IndividualProps {
   compras: Tips;
   vendas: Tips;
   presenca: Tips;
   indication: Tips;
   b2b: Tips;
}

interface Tips {
   id: string;
   nome: string;
   pontos: number;
   rank: number;
   valor?: number;
}
export class IndicifualPontsService {
   constructor(
      private userRepository: IUsersRepository,
      private repoRelation: IRepoRelationship,
   ) {}

   async execute(user_id: string): Promise<any> {
      const relations = await this.repoRelation.listAll();
      const users = await this.userRepository.listAllUser();

      users.forEach(user => {
         const dt = {
            type: '',
            pontos: 0,
         };
         relations.forEach(client => {
            console.log(client);
         });
      });

      return 'dados';
   }
}
