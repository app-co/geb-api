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

import { pontos } from '../../../utils/pontos';
import { IRelashionship, IRelashionshipUpdate } from '../dtos';
import { IRepoRelationship } from '../repositories/repo-relationship';

export class UseCasesRelationship implements IRepoRelationship {
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

   async create(data: IRelashionship): Promise<RelationShip> {
      const findMembro = await this.repoUser.findById(data.membro_id);

      if (!findMembro) {
         throw new Err('Membro não encontrado');
      }

      if (data.fk_user_id === data.membro_id) {
         throw new Err('Você não pode fazer negócios com você mesmo');
      }

      const create = await this.repoRelation.create(data);

      return create;
   }

   async delete(id: string): Promise<void> {
      await this.repoRelation.delete(id);
   }

   async update(data: IRelashionshipUpdate): Promise<RelationShip> {
      const findRelation = await this.repoRelation.findById(data.id);
      const membro = await this.repoUser.findById(data.membro_id);

      if (!membro) {
         throw new Err('Membro não encontrado');
      }

      if (!findRelation) {
         throw new Err('Relacionament não encontrado');
      }

      if (findRelation.membro_id !== data.membro_id) {
         throw new Err('Você não pode validar esse relacionamento');
      }

      if (findRelation.situation) {
         throw new Err('Relacionamento já validado');
      }

      const pt = findRelation.ponts;

      const dt = {
         ...data,
         ponts: pt + data.ponts,
      };
      const up = await this.repoRelation.update(dt);

      return up;
   }

   async listAll(): Promise<RelationShip[]> {
      const list = await this.repoRelation.listAll();
      return list;
   }

   async listByMembro(membro: string): Promise<RelationShip[]> {
      const list = await this.repoRelation.listByMembro(membro);

      const consumoIn = list.map(h => {
         return {
            ...h,
            type: 'CONSUMO_IN',
         };
      });

      return consumoIn;
   }

   async listByUserId(fk_user_id: string): Promise<RelationShip[]> {
      const list = await this.repoRelation.listByUserId(fk_user_id);

      return list;
   }

   async findById(id: string): Promise<RelationShip | null> {
      const find = await this.repoRelation.findById(id);

      return find;
   }

   async data(): Promise<void> {
      const b2b = await this.repoB2b.listAllB2b();
      const ind = await this.repoInd.listAll();
      const donate = await this.repoDonate.listMany();
      const order = await this.repoOrder.findAllOrder();
      const consumo = await this.repeConsumo.listAllTransaction();
      const invit = await this.repoInvit.listAll();
      const presencaO = await this.repoPresenca.listAllOrder();
      const presenca = await this.repoPresenca.listAllPresenca();

      b2b.forEach(async h => {
         const objto = {
            description: h.assunto,
            send_name: h.send_name,
         };

         const dt = {
            objto,
            created_at: new Date(h.createdAt),
            updated_at: new Date(h.updated_at),
            situation: h.validate,
            type: RelationType.B2B,
            ponts: 20,
            prestador: h.recevid_id,
            client_id: h.send_id,
            fk_user_id: h.send_id,
         };
         console.log(dt);
         await this.repoRelation.create(dt);
         console.log(dt);
      });

      ind.forEach(async h => {
         const objto = {
            quemIndicaou_name: h.quemIndicou_name,
            client_name: h.client_name,
            phone_number_client: h.phone_number_client,
            description: h.description,
         };

         const dt = {
            objto,
            created_at: new Date(h.createdAt),
            updated_at: new Date(h.updated_at),
            situation: h.validate,
            type: RelationType.INDICATION,
            ponts: 15,
            fk_user_id: h.quemIndicou_id,
            client_id: h.quemIndicou_id,
            prestador_id: h.indicado_id,
         };

         console.log(dt);

         await this.repoRelation.create(dt);
      });

      // donate.forEach(async h => {
      //    const objto = {
      //       itens: 'arroz, feijao, batata, oleo',
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

      //    console.log(dt);

      //    await this.repoRelation.create(dt);
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
      //       ponts: pontos.consumo,
      //       fk_user_id: h.consumidor_id,
      //       membro_id: h.prestador_id,
      //    };

      //    console.log(dt);

      //    await this.repoRelation.create(dt);
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
      //       ponts: pontos.consumo,
      //       client_id: h?.consumidor_id ? h?.consumidor_id : '',
      //       prestador_id: h.prestador_id,
      //       fk_user_id: h?.consumidor_id ? h?.consumidor_id : h.prestador_id,
      //    };

      //    console.log(dt);

      //    await this.repoRelation.create(dt);
      // });

      // invit.forEach(async h => {
      //    console.log(h);

      //    const objto = {
      //       name_convidado: h.name_convidado,
      //    };

      //    const dt = {
      //       objto,
      //       created_at: new Date(h.created_at),
      //       updated_at: new Date(h.updated_at),
      //       situation: h.approved,
      //       type: RelationType.INDICATION,
      //       ponts: 20,
      //       fk_user_id: h.fk_user_id,
      //    };

      //    await this.repoRelation.create(dt);
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
      //       ponts: pontos.presenca,
      //       fk_user_id: h.user_id,
      //    };

      //    console.log(dt);

      //    await this.repoRelation.create(dt);
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
      //       ponts: pontos.presenca,
      //       fk_user_id: h.user_id,
      //    };

      //    console.log(dt);

      //    await this.repoRelation.create(dt);
      // });
   }
}
