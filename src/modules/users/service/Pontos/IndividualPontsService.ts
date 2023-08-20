/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { IRelationship } from '@modules/relationship/dtos';
import { IRepoRelationship } from '@modules/relationship/repositories/repo-relationship';
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
      const relation = await this.repoRelation.listAll();
      const users = await this.userRepository.listAllUser();

      const validRelation = relation.filter(h => h.situation === true);

      const Concumo = users
         .map((user, index) => {
            const cons = validRelation
               .filter(h => h.client_id === user.id && h.type === 'CONSUMO_OUT')
               .map(h => {
                  const { valor } = h.objto;

                  return {
                     ...h,
                     valor,
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
                  const { valor } = h.objto;

                  return {
                     ...h,
                     valor,
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
                  h.objto?.itens?.forEach(p => {
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

      const relatori = {
         compras: Concumo,
         vendas: Vendas,
         presenca: Pres,
         indication: Ind,
         b2b: B2,
         padrinho,
         convidado,
         donates,
      };

      const dados = {
         compras: relatori.compras.find(h => h.id === user_id),
         vendas: relatori.vendas.find(h => h.id === user_id),
         presenca: relatori.presenca.find(h => h.id === user_id),
         indication: relatori.indication.find(h => h.id === user_id),
         b2b: relatori.b2b.find(h => h.id === user_id),
         padrinho: relatori.padrinho.find(h => h.id === user_id),
         convidado: relatori.convidado.find(h => h.id === user_id),
         donates: relatori.donates.find(h => h.id === user_id),
      };

      // await this.cache.save(`individualPonts:${user_id}`, dados);
      // }

      return dados;
   }
}
