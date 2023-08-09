import { IB2bRepository } from '@modules/B2b/repositories/IB2bRepository';
import { IConsumoRepository } from '@modules/consumo/repositories/IConsumoRepository';
import { IConvidadoPrisma } from '@modules/convidado/repositories/IConvidadoPrisma';
import { IDonateRepository } from '@modules/Donate/repositories/IRepository/IDonateRepository';
import { IIndicationRepository } from '@modules/indication/infra/repositories/IIndicationRepository';
import { IPresencaRespository } from '@modules/presensa/repositories/IPresençaRepository';
import { ITransactionRepository } from '@modules/transaction/repositories/ITransactionRespository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { RelationShip, RelationType } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import axios from 'axios';

import { prisma } from '../../../lib';
import { IRelashionship, IRelashionshipUpdate } from '../dtos';
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
   consumo: IRelashionship[];
   venda: IRelashionship[];
   b2b: IRelashionship[];
   donate: IRelashionship[];
   indication: IRelashionship[];
   padrinho: IRelashionship[];
   presenca: IRelashionship[];
   totalConsumo: number;
   totalVenda: number;
   invit: IRelashionship[];
}

const msn = {
   B2B: {
      title: 'B2B',
      message: 'Alguem lonçou um B2B com você',
      replica: 'Seu B2B foi validado',
      reject: 'Sua solicitação foi rejeitada',
   },
   CONSUMO_IN: {
      title: 'CONSUMO',
      message:
         'Seu negócio está a todo vapor! `\n`Alguém está consumindo o seu produto',
      replica: 'Seu consumo foi validado!',
      reject: 'Sua solicitação foi rejeitada',
   },
   CONSUMO_OUT: {
      title: 'CONSUMO',
      message:
         'Seu negócio está a todo vapor! Alguém está consumindo o seu produto',
      replica: 'Seu consumo foi validado!',
      reject: 'Sua solicitação foi rejeitada',
   },
   PADRINHO: {
      title: 'PADRINHO',
      message: 'Você foi apadrinhao!',
      replica: '',
      reject: 'Sua solicitação foi rejeitada',
   },
   PRESENCA: {
      title: 'PRESENÇA',
      message: 'Nova solicitação de presença',
      replica: 'Os ADMs validou sua presença',
      reject: 'Sua solicitação foi rejeitada',
   },
   INDICATION: {
      title: 'INDICAÇÃO',
      message:
         'Você foi indicado para fazer negócios com um novo cliente. Esperamos que de tudo certo!',
      replica:
         'Sua indicação deu certo. O membro que você indicou está negociando com o cliente',
      reject: 'Sua solicitação foi rejeitada',
   },
   DONATE: {
      title: 'DONATIVOS',
      message: 'Você tem donativos para validar',
      replica: 'Seus donativos foram validados! ',
      reject: 'Sua solicitação foi rejeitada',
   },
   INVIT: {
      title: 'CONVIDADO',
      message: 'Um membro tem um convidado para participar do evento!',
      replica: 'Seu convite foi aceito pelos administradores.',
      reject: 'Sua solicitação foi rejeitada',
   },
};

export class UseCasesRelationship {
   constructor(
      private repoRelation: IRepoRelationship,
      private repoUser: IUsersRepository,
      private repoCache: ICacheProvider,
   ) {}

   async extratoPending(user_id: string): Promise<IResponse> {
      const order =
         (await this.repoRelation.listPending()) as unknown as IRelashionship[];

      const consumo = order
         .filter(h => h.client_id === user_id && h.type === 'CONSUMO_OUT')
         .map(h => {
            const valor = h.objto.valor / 100;
            const currency = valor.toLocaleString('pt-BR', {
               style: 'currency',
               currency: 'BRL',
            });

            return {
               ...h,
               objto: {
                  ...h.objto,
                  currency,
               },
            };
         });

      const venda = order
         .filter(h => h.prestador_id === user_id && h.type === 'CONSUMO_OUT')
         .map(h => {
            const valor = h.objto.valor / 100;
            const currency = valor.toLocaleString('pt-BR', {
               style: 'currency',
               currency: 'BRL',
            });

            return {
               ...h,
               objto: {
                  ...h.objto,
                  valor: currency,
               },
            };
         });

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

      const currencyConcumo = totalConsumo.toLocaleString('pt-BR', {
         style: 'currency',
         currency: 'BRL',
      });

      const currencyVenda = totalVenda.toLocaleString('pt-BR', {
         style: 'currency',
         currency: 'BRL',
      });

      const resonse = {
         consumo,
         venda,
         b2b,
         donate,
         indication,
         padrinho,
         presenca,
         totalConsumo: currencyConcumo,
         totalVenda: currencyVenda,
         invit,
      };

      return resonse;
   }

   async extratoValid(user_id: string): Promise<IResponse> {
      const order =
         (await this.repoRelation.listValidated()) as unknown as IRelashionship[];

      const consumo = order
         .filter(h => h.client_id === user_id && h.type === 'CONSUMO_OUT')
         .map(h => {
            const valor = h.objto.valor / 100;
            const currency = valor.toLocaleString('pt-BR', {
               style: 'currency',
               currency: 'BRL',
            });

            return {
               ...h,
               objto: {
                  ...h.objto,
                  currency,
               },
            };
         });

      const venda = order
         .filter(h => h.prestador_id === user_id && h.type === 'CONSUMO_OUT')
         .map(h => {
            const valor = h.objto.valor / 100;
            const currency = valor.toLocaleString('pt-BR', {
               style: 'currency',
               currency: 'BRL',
            });

            return {
               ...h,
               objto: {
                  ...h.objto,
                  currency,
               },
            };
         });

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

      const totalConsumo =
         consumo.reduce((ac, i) => {
            return ac + i.objto.valor;
         }, 0) / 100;

      const totalVenda =
         venda.reduce((ac, i) => {
            return ac + i.objto.valor;
         }, 0) / 100;

      const currencyConcumo = totalConsumo.toLocaleString('pt-BR', {
         style: 'currency',
         currency: 'BRL',
      });

      const currencyVenda = totalVenda.toLocaleString('pt-BR', {
         style: 'currency',
         currency: 'BRL',
      });

      console.log('server');

      const resonse = {
         consumo,
         venda,
         b2b,
         donate,
         indication,
         padrinho,
         presenca,
         totalConsumo: currencyConcumo,
         totalVenda: currencyVenda,
         invit,
      };

      return resonse;
   }

   async create(data: IRelashionship, token: string): Promise<RelationShip> {
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
         } else {
            await this.repoUser.updateSituation({
               id: findSituation.id,
               firstLogin: findSituation.firstLogin,
               apadrinhado: !findSituation.apadrinhado,
               inativo: findSituation.inativo,
            });

            create = await this.repoRelation.create(dt);
            await this.repoCache.invalidate('relation-prestador');
         }
      } else {
         const message = {
            to: token,
            sound: 'default',
            title: msn[data.type].title,
            body: msn[data.type].message,
         };

         console.log(token);

         await axios
            .post('https://exp.host/--/api/v2/push/send', message)
            .then(h => console.log(h.data))
            .catch(h => console.log(h.response.data.errors, 'erro'));
         create = await this.repoRelation.create(dt);
      }

      return create;
   }

   async delete(id: string): Promise<void> {
      const find = (await this.repoRelation.findById(
         id,
      )) as unknown as IRelashionship;

      if (!find) {
         throw new Err('Relacionament não encontrado');
      }

      const message = {
         to: find?.objto.token,
         sound: 'default',
         title: msn[find.type].title,
         body: msn[find.type].reject,
      };

      await axios
         .post('https://exp.host/--/api/v2/push/send', message)
         .then(h => console.log(h.data))
         .catch(h => console.log(h.response.data.errors, 'erro'));

      await this.repoRelation.delete(id);
   }

   async update(data: IRelashionshipUpdate): Promise<RelationShip> {
      const findRelation = (await this.repoRelation.findById(
         data.id,
      )) as unknown as IRelashionship;

      console.log(findRelation);

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

      const message = {
         to: findRelation?.objto.token,
         sound: 'default',
         title: msn[findRelation.type].title,
         body: msn[findRelation.type].replica,
      };

      await axios
         .post('https://exp.host/--/api/v2/push/send', message)
         .then(h => console.log(h.data))
         .catch(h => console.log(h.response.data.errors, 'erro'));

      return up;
   }

   async listAll(): Promise<RelationShip[]> {
      const list = await this.repoRelation.listAll();
      return list;
   }

   async listByPrestador(prestador_id: string): Promise<RelationShip[]> {
      const list = (await this.repoRelation.listByPrestador(
         prestador_id,
      )) as unknown as IRelashionship[];
      await this.repoCache.save('relation-prestador', list);

      let currency = '';
      let totalValor = 0;
      const relation = list.map(h => {
         if (h.objto.valor) {
            const valor = h.objto.valor / 100;
            totalValor += valor;
            currency = valor.toLocaleString('pt-BR', {
               style: 'currency',
               currency: 'BRL',
            });
         }

         let b = {};

         if (h.type === 'CONSUMO_OUT') {
            b = {
               ...h,
               objto: {
                  ...h.objto,
                  valor: currency,
               },
            };
         } else {
            b = {
               ...h,
            };
         }
         return b;
      });

      const rs = {
         relation,
         totalValor: totalValor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
         }),
      };

      return rs;
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
      // const consumo = await this.repeConsumo.listAllTransaction();
      // const padrinho = await this.repoUser.listAllPadrinho();
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
