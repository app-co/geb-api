/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IB2bRepository } from '@modules/B2b/repositories/IB2bRepository';
import { IIndicationRepository } from '@modules/indication/infra/repositories/IIndicationRepository';
import { IPresencaRespository } from '@modules/presensa/repositories/IPresençaRepository';
import { IRepoRelationship } from '@modules/relationship/repositories/repo-relationship';
import { ITransactionRepository } from '@modules/transaction/repositories/ITransactionRespository';
import {
   B2b,
   Indication,
   Padrinho,
   Presenca,
   Transaction,
   User,
} from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { pontos as ponts } from '../../../../utils/pontos';
import { IUsersRepository } from '../../repositories/IUsersRespository';

interface Props {
   TP: PropsTotalPontos[];
   compras: Tips[];
   vendas: Tips[];
   presenca: Tips[];
   indication: Tips[];
   b2b: Tips[];
}

interface Tips {
   id: string;
   nome: string;
   pontos: number;
   rank: number;
   valor?: number;
}

interface PropsTotalPontos {
   nome: string;
   totalPontos: number;
}

@injectable()
export class GlobalPontsService {
   constructor(
      private userRepository: IUsersRepository,
      private repoRelation: IRepoRelationship,
   ) {}

   async execute(): Promise<any> {
      const relation = await this.repoRelation.listAll();
      const users = await this.userRepository.listAllUser();

      const validRelation = relation.filter(h => h.situation === true);

      const Concumo = users
         .map((user, index) => {
            const cons = validRelation
               .filter(h => h.client_id === user.id && h.type === 'CONSUMO_OUT')
               .map(h => {
                  const { value } = h.objto;

                  return {
                     ...h,
                     valor: value,
                  };
               });

            const valor =
               cons.reduce((ac, i) => {
                  return ac + Number(i.valor);
               }, 0) / 100;

            const consumo = {
               id: user.id,
               nome: user.nome,
               pontos: cons!.length * 10,
               valor,
            };
            return {
               consumo,
            };
         })
         .sort((a, b) => {
            if (a.consumo.nome > b.consumo.nome) {
               return -0;
            }
            return -1;
         })
         .sort((a, b) => {
            return b.consumo.pontos - a.consumo.pontos;
         })
         .map((h, i) => {
            return {
               ...h.consumo,
               rank: i + 1,
            };
         });

      const Vendas = users
         .map((user, index) => {
            const cons = validRelation
               .filter(
                  h => h.prestador_id === user.id && h.type === 'CONSUMO_OUT',
               )
               .map(h => {
                  const { value } = h.objto;

                  return {
                     ...h,
                     valor: value,
                  };
               });

            const valor =
               cons.reduce((ac, i) => {
                  return ac + Number(i.valor);
               }, 0) / 100;

            const consumo = {
               id: user.id,
               nome: user.nome,
               pontos: cons.length * ponts.consumo,
               valor,
            };
            return {
               consumo,
            };
         })
         .sort((a, b) => {
            if (a.consumo.nome > b.consumo.nome) {
               return -0;
            }
            return -1;
         })
         .sort((a, b) => {
            return b.consumo.pontos - a.consumo.pontos;
         })
         .map((h, i) => {
            return {
               ...h.consumo,
               rank: i + 1,
            };
         });

      const Pres = users
         .map(user => {
            const userPresenca = validRelation.filter(
               h => h.fk_user_id === user.id && h.type === 'PRESENCA',
            );

            const qnt = userPresenca.length;

            return {
               id: user.id,
               nome: user.nome,
               pontos: qnt * ponts.presenca,
               quantidade: qnt,
            };
         })
         .sort((h, b) => {
            if (h.nome > b.nome) {
               return -0;
            }
            return -1;
         })
         .sort((a, b) => {
            return b.pontos - a.pontos;
         })
         .map((h, i) => {
            return {
               ...h,
               rank: i + 1,
            };
         });

      const Ind = users
         .map(user => {
            const fil = validRelation.filter(
               h => h.fk_user_id === user.id && h.type === 'INDICATION',
            );

            const pt = fil.length;

            const pont = {
               id: user.id,
               nome: user.nome,
               pontos: pt * ponts.indication,
            };

            return pont;
         })
         .sort((a, b) => {
            if (a.nome > b.nome) {
               return -0;
            }
            return -1;
         })
         .sort((a, b) => {
            return b.pontos - a.pontos;
         })
         .map((h, i) => {
            return {
               ...h,
               rank: i + 1,
            };
         });

      const B2 = users
         .map(user => {
            const cons = validRelation.filter(
               h => h.fk_user_id === user.id && h.type === 'B2B',
            );

            const send = {
               id: user.id,
               nome: user.nome,
               pontos: cons.length * ponts.b2b,
            };
            return {
               send,
            };
         })
         .sort((a, b) => {
            if (a.send.nome > b.send.nome) {
               return -0;
            }
            return -1;
         })
         .sort((a, b) => {
            return b.send.pontos - a.send.pontos;
         })
         .map((h, i) => {
            return {
               ...h.send,
               rank: i + 1,
            };
         });

      const padrinho = users
         .map(user => {
            const allP = validRelation.filter(
               h => h.fk_user_id === user.id && h.type === 'PADRINHO',
            );

            const pt = allP.length;

            const send = {
               id: user.id,
               nome: user.nome,
               pontos: pt * ponts.padrinho,
            };
            return {
               send,
            };
         })
         .sort((a, b) => {
            if (a.send.nome > b.send.nome) {
               return -0;
            }
            return -1;
         })
         .sort((a, b) => {
            return b.send.pontos - a.send.pontos;
         })
         .map((h, i) => {
            return {
               ...h.send,
               rank: i + 1,
            };
         });

      const convidado = users
         .map(user => {
            const allP = validRelation.filter(
               h => h.fk_user_id === user.id && h.type === 'INVIT',
            );

            const pt = allP.length * 10;

            const send = {
               id: user.id,
               nome: user.nome,
               pontos: pt,
            };
            return {
               send,
            };
         })
         .sort((a, b) => {
            if (a.send.nome > b.send.nome) {
               return -0;
            }
            return -1;
         })
         .sort((a, b) => {
            return b.send.pontos - a.send.pontos;
         })
         .map((h, i) => {
            return {
               ...h.send,
               rank: i + 1,
            };
         });

      const donates = users
         .map(user => {
            const itens = [];
            validRelation
               .filter(h => {
                  if (h.fk_user_id === user.id && h.type === 'DONATE') {
                     return h;
                  }
               })
               .forEach(h => {
                  h.objto?.itens.forEach(p => {
                     itens.push(p);
                  });
               });

            const pt = itens.length * 10;

            const send = {
               id: user.id,
               nome: user.nome,
               pontos: pt,
            };
            return {
               send,
            };
         })
         .sort((a, b) => {
            if (a.send.nome > b.send.nome) {
               return -0;
            }
            return -1;
         })
         .sort((a, b) => {
            return b.send.pontos - a.send.pontos;
         })
         .map((h, i) => {
            return {
               ...h.send,
               rank: i + 1,
            };
         });

      const Total: PropsTotalPontos[] = [];

      users.forEach(user => {
         let pt = {
            nome: '',
            totalPontos: 0,
         };

         Concumo.forEach(c => {
            if (c.id === user.id) {
               pt = {
                  nome: c.nome,
                  totalPontos: pt.totalPontos + c.pontos,
               };
            }
         });

         Vendas.forEach(c => {
            if (c.id === user.id) {
               pt = {
                  nome: c.nome,
                  totalPontos: pt.totalPontos + c.pontos,
               };
            }
         });

         Pres.forEach(c => {
            if (c.id === user.id) {
               pt = {
                  nome: c.nome,
                  totalPontos: pt.totalPontos + c.pontos,
               };
            }
         });

         Ind.forEach(c => {
            if (c.id === user.id) {
               pt = {
                  nome: c.nome,
                  totalPontos: pt.totalPontos + c.pontos,
               };
            }
         });

         B2.forEach(c => {
            if (c.id === user.id) {
               pt = {
                  nome: c.nome,
                  totalPontos: pt.totalPontos + c.pontos,
               };
            }
         });

         padrinho.forEach(c => {
            if (c.id === user.id) {
               pt = {
                  nome: c.nome,
                  totalPontos: pt.totalPontos + c.pontos,
               };
            }
         });

         convidado.forEach(c => {
            if (c.id === user.id) {
               pt = {
                  nome: c.nome,
                  totalPontos: pt.totalPontos + c.pontos,
               };
            }
         });

         donates.forEach(c => {
            if (c.id === user.id) {
               pt = {
                  nome: c.nome,
                  totalPontos: pt.totalPontos + c.pontos,
               };
            }
         });

         Total.push(pt);
      });

      const TP = Total.sort((a, b) => {
         if (b.totalPontos > a.totalPontos) {
            return 0;
         }
         return -1;
      });

      const relatori = {
         TP,
         compras: Concumo,
         vendas: Vendas,
         presenca: Pres,
         indication: Ind,
         b2b: B2,
         padrinho,
         convidado,
         donates,
      };

      return relatori;
   }
}
