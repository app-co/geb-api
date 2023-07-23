import { IB2bRepository } from '@modules/B2b/repositories/IB2bRepository';
import { IConsumoRepository } from '@modules/consumo/repositories/IConsumoRepository';
import { IConvidadoPrisma } from '@modules/convidado/repositories/IConvidadoPrisma';
import { IDonateRepository } from '@modules/Donate/repositories/IRepository/IDonateRepository';
import { IIndicationRepository } from '@modules/indication/infra/repositories/IIndicationRepository';
import { IPresencaRespository } from '@modules/presensa/repositories/IPresençaRepository';
import { ITransactionRepository } from '@modules/transaction/repositories/ITransactionRespository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { RelationShip, RelationType } from '@prisma/client';
import { Err } from '@shared/errors/AppError';

import { prisma } from '../../../lib';
import {
   IRelashionship,
   IRelashionshipConsumo,
   IRelashionshipUpdate,
} from '../dtos';
import { IRepoRelationship } from '../repositories/repo-relationship';

const ponts = {
   B2B: 20,
   CONSUMO_IN: 10,
   CONSUMO_OUT: 10,
   PADRINHO: 35,
   PRESENCA: 10,
   INDICATION: 15,
   DONATE: 50,
   INVIT: 10,
};

interface IResponse {
   consumo: IRelashionshipConsumo[];
   venda: IRelashionshipConsumo[];
   b2b: IRelashionship[];
   donate: IRelashionship[];
   indication: IRelashionship[];
   padrinho: IRelashionship[];
   presenca: IRelashionship[];
   totalConsumo: number;
   totalVenda: number;
   invit: IRelashionship[];
}

export class UseCasesRelationship {
   constructor(
      private repoRelation: IRepoRelationship,

      private repoUser: IUsersRepository,
      private repoB2b: IB2bRepository,
      private repoInd: IIndicationRepository,
      private repoDonate: IDonateRepository,
      private repoOrder: IConsumoRepository,
      private repeConsumo: ITransactionRepository,
      private repoInvit: IConvidadoPrisma,
      private repoPresenca: IPresencaRespository,
   ) {}

   async extratoPending(user_id: string): Promise<IResponse> {
      const order = await this.repoRelation.listPending();

      const consumo = order.filter(
         h => h.client_id === user_id && h.type === 'CONSUMO_OUT',
      ) as unknown as IRelashionshipConsumo[];

      const venda = order.filter(
         h => h.prestador_id === user_id && h.type === 'CONSUMO_OUT',
      ) as unknown as IRelashionshipConsumo[];

      const b2b = order.filter(
         h => h.fk_user_id === user_id && h.type === 'B2B',
      );

      const invit = order.filter(
         h => h.fk_user_id === user_id && h.type === 'INVIT',
      );

      const donate = order.filter(
         h => h.fk_user_id === user_id && h.type === 'DONATE',
      );

      const indication = order.filter(
         h => h.fk_user_id === user_id && h.type === 'INDICATION',
      );

      const padrinho = order.filter(
         h => h.fk_user_id === user_id && h.type === 'PADRINHO',
      );

      const presenca = order.filter(
         h => h.fk_user_id === user_id && h.type === 'PRESENCA',
      );

      const totalConsumo = consumo.reduce((ac, i) => {
         return ac + i.objto.valor;
      }, 0);

      const totalVenda = venda.reduce((ac, i) => {
         return ac + i.objto.valor;
      }, 0);

      const resonse = {
         consumo,
         venda,
         b2b,
         donate,
         indication,
         padrinho,
         presenca,
         totalConsumo,
         totalVenda,
         invit,
      };

      return resonse;
   }

   async extratoValid(user_id: string): Promise<IResponse> {
      const order = await this.repoRelation.listValidated();

      const consumo = order.filter(
         h => h.client_id === user_id && h.type === 'CONSUMO_OUT',
      ) as unknown as IRelashionshipConsumo[];

      const venda = order.filter(
         h => h.prestador_id === user_id && h.type === 'CONSUMO_OUT',
      ) as unknown as IRelashionshipConsumo[];

      const b2b = order.filter(
         h => h.fk_user_id === user_id && h.type === 'B2B',
      );

      const invit = order.filter(
         h => h.fk_user_id === user_id && h.type === 'INVIT',
      );

      const donate = order.filter(
         h => h.fk_user_id === user_id && h.type === 'DONATE',
      );

      const indication = order.filter(
         h => h.fk_user_id === user_id && h.type === 'INDICATION',
      );

      const padrinho = order.filter(
         h => h.fk_user_id === user_id && h.type === 'PADRINHO',
      );

      const presenca = order.filter(
         h => h.fk_user_id === user_id && h.type === 'PRESENCA',
      );

      const totalConsumo = consumo.reduce((ac, i) => {
         return ac + i.objto.valor;
      }, 0);

      const totalVenda = venda.reduce((ac, i) => {
         return ac + i.objto.valor;
      }, 0);

      const resonse = {
         consumo,
         venda,
         b2b,
         donate,
         indication,
         padrinho,
         presenca,
         totalConsumo,
         totalVenda,
         invit,
      };

      return resonse;
   }

   async create(data: IRelashionship): Promise<RelationShip> {
      if (data.prestador_id) {
         const prestador = await this.repoUser.findById(data.prestador_id);
         if (!prestador) {
            throw new Err('Prestador não encontrado');
         }
      }

      if (data.client_id === data.prestador_id && data.type === 'CONSUMO_OUT') {
         if (data.fk_user_id === data.prestador_id) {
            throw new Err('Você não pode fazer negócios com você mesmo');
         }
      }

      const dt = {
         ...data,
         ponts: ponts[data.type],
      };

      let create = {} as RelationShip;

      if (data.type === 'PADRINHO') {
         if (data.fk_user_id === data.objto.apadrinhado_id) {
            throw new Err('Você não pode se alto apadrinhar', 401);
         }
         const findSituation = await prisma.situationUser.findUnique({
            where: { fk_id_user: data.objto!.apadrinhado_id },
         });
         const findRelation = await prisma.relationShip.findFirst({
            where: {
               objto: {
                  equals: data.objto,
               },
            },
         });

         if (!findSituation) {
            throw new Err('Usuário não encontrado', 401);
         }

         if (findRelation) {
            await this.repoUser.updateSituation({
               id: findSituation.id,
               firstLogin: findSituation.firstLogin,
               apadrinhado: !findSituation.apadrinhado,
               inativo: findSituation.inativo,
            });

            const up = {
               ...dt,
               id: findRelation.id,
               situation: !findRelation.situation,
            };

            create = await this.repoRelation.update(up);
            console.log('up relation');
         } else {
            await this.repoUser.updateSituation({
               id: findSituation.id,
               firstLogin: findSituation.firstLogin,
               apadrinhado: !findSituation.apadrinhado,
               inativo: findSituation.inativo,
            });

            create = await this.repoRelation.create(dt);
         }
      } else {
         create = await this.repoRelation.create(dt);
      }

      return create;
   }

   async delete(id: string): Promise<void> {
      await this.repoRelation.delete(id);
   }

   async update(data: IRelashionshipUpdate): Promise<RelationShip> {
      const findRelation = await this.repoRelation.findById(data.id);

      const type =
         'B2B' ||
         'CONSUMO_IN' ||
         'CONSUMO_OUT' ||
         'PADRINHO' ||
         'PRESENCA' ||
         'INDICATION' ||
         'DONATE' ||
         'INVIT';

      if (!findRelation) {
         throw new Err('Relacionament não encontrado');
      }

      if (findRelation.situation) {
         throw new Err('Relacionamento já validado', 401);
      }

      if (findRelation.fk_user_id === data.prestador_id) {
         throw new Err('Você não pode validar esse relacionamento', 401);
      }

      const pt = findRelation.ponts;

      const ponts = {
         B2B: 20,
         CONSUMO_IN: 10,
         CONSUMO_OUT: 10,
         PADRINHO: 35,
         PRESENCA: 10,
         INDICATION: 15,
         DONATE: 50,
         INVIT: 10,
      };

      const dt = {
         ...data,
         ponts: pt + ponts[findRelation.type],
      };

      const up = await this.repoRelation.update(dt);

      return up;
   }

   async listAll(): Promise<RelationShip[]> {
      const list = await this.repoRelation.listAll();
      return list;
   }

   async listByPrestador(prestador_id: string): Promise<RelationShip[]> {
      const list = await this.repoRelation.listByPrestador(prestador_id);

      return list;
   }

   async listByClient(client_id: string): Promise<RelationShip[]> {
      const list = await this.repoRelation.listByClient(client_id);

      return list;
   }

   async findById(id: string): Promise<RelationShip | null> {
      const find = await this.repoRelation.findById(id);

      return find;
   }

   async data(): Promise<void> {
      const consumo = await this.repeConsumo.listAllTransaction();
      const padrinho = await this.repoUser.listAllPadrinho();

      // b2b.forEach(async h => {
      //    const objto = {
      //       description: h.assunto,
      //       send_name: h.send_name,
      //    };

      //    const dt = {
      //       objto,
      //       created_at: new Date(h.createdAt),
      //       updated_at: new Date(h.updated_at),
      //       situation: h.validate,
      //       type: RelationType.B2B,
      //       ponts: 20,
      //       prestador_id: h.recevid_id,
      //       fk_user_id: h.send_id,
      //    };
      //    await this.repoRelation.create(dt).then(h => {
      //       console.log(dt);
      //    });
      // });

      // ind.forEach(async h => {
      //    const objto = {
      //       quemIndicaou_name: h.quemIndicou_name,
      //       client_name: h.client_name,
      //       phone_number_client: h.phone_number_client,
      //       description: h.description,
      //    };

      //    const dt = {
      //       objto,
      //       created_at: new Date(h.createdAt),
      //       updated_at: new Date(h.updated_at),
      //       situation: h.validate,
      //       type: RelationType.INDICATION,
      //       ponts: ponts[RelationType.INDICATION],
      //       fk_user_id: h.quemIndicou_id,
      //       client_id: h.quemIndicou_id,
      //       prestador_id: h.indicado_id,
      //    };

      //    await this.repoRelation.create(dt).then(() => {
      //       console.log(dt);
      //    });
      // });

      // donate.forEach(async h => {
      //    const objto = {
      //       itens: h.itens,
      //    };

      //    const dt = {
      //       objto,
      //       created_at: new Date(h.created_at),
      //       updated_at: new Date(h.updated_at),
      //       situation: h.approved,
      //       type: RelationType.DONATE,
      //       ponts: 50,
      //       fk_user_id: h.fk_id_user,
      //    };

      //    await this.repoRelation.create(dt).then(() => {
      //       console.log(dt);
      //    });
      // });

      // order.forEach(async h => {
      //    const objto = {
      //       consumidor_name: 'teste',
      //       valor: h.valor,
      //       descricao: h.descricao,
      //    };

      //    const dt = {
      //       objto,
      //       created_at: new Date(h.created_at),
      //       situation: false,
      //       type: RelationType.CONSUMO_OUT,
      //       ponts: ponts[RelationType.CONSUMO_OUT],
      //       fk_user_id: h.consumidor_id,
      //       prestador_id: h.prestador_id,
      //    };

      //    await this.repoRelation.create(dt).then(h => console.log(dt));
      // });

      // consumo.forEach(async h => {
      //    const objto = {
      //       client_name: h?.consumidor_name ? h.consumidor_name : '',
      //       valor: h.valor,
      //       descricao: h.descricao,
      //    };

      //    const dt = {
      //       objto,
      //       created_at: new Date(h.created_at),
      //       updated_at: new Date(h.updated_at),
      //       situation: true,
      //       type: RelationType.CONSUMO_OUT,
      //       ponts: ponts[RelationType.CONSUMO_OUT],
      //       client_id: h?.consumidor_id ? h?.consumidor_id : '',
      //       prestador_id: h.prestador_id,
      //       fk_user_id: h?.consumidor_id ? h?.consumidor_id : h.prestador_id,
      //    };

      //    await this.repoRelation.create(dt).then(h => console.log(dt));
      // });

      // padrinho.forEach(async h => {
      //    const objto = {
      //       apadrinhado_name: h.apadrinhado_name,
      //       apadrinhado_id: h.apadrinhado_id,
      //    };

      //    const dt = {
      //       objto,
      //       created_at: new Date(h.created_at),
      //       updated_at: new Date(h.updated_at),
      //       situation: true,
      //       type: RelationType.PADRINHO,
      //       ponts: ponts[RelationType.PADRINHO],
      //       fk_user_id: h.user_id,
      //    };

      //    await this.repoRelation.create(dt).then(h => console.log(dt));
      // });

      // invit.forEach(async h => {
      //    const objto = {
      //       name_convidado: h.name_convidado,
      //    };

      //    const dt = {
      //       objto,
      //       created_at: new Date(h.created_at),
      //       updated_at: new Date(h.updated_at),
      //       situation: h.approved,
      //       type: RelationType.INVIT,
      //       ponts: 20,
      //       fk_user_id: h.fk_user_id,
      //    };

      //    await this.repoRelation.create(dt).then(() => console.log(dt));
      // });

      // presencaO.forEach(async h => {
      //    const objto = {
      //       nome: h.nome,
      //    };

      //    const dt = {
      //       objto,
      //       created_at: new Date(h.createdAt),
      //       situation: false,
      //       type: RelationType.PRESENCA,
      //       ponts: ponts[RelationType.PRESENCA],
      //       fk_user_id: h.user_id,
      //    };

      //    await this.repoRelation.create(dt).then(() => console.log(dt));
      // });

      // presenca.forEach(async h => {
      //    const objto = {
      //       nome: h.nome,
      //    };

      //    const dt = {
      //       objto,
      //       created_at: new Date(h.createdAt),
      //       situation: true,
      //       type: RelationType.PRESENCA,
      //       ponts: ponts[RelationType.PRESENCA],
      //       fk_user_id: h.user_id,
      //    };

      //    await this.repoRelation.create(dt).then(() => console.log(dt));
      // });
   }
}
