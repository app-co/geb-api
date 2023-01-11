/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IB2bRepository } from '@modules/B2b/repositories/IB2bRepository';
import { IIndicationRepository } from '@modules/indication/infra/repositories/IIndicationRepository';
import { IPresencaRespository } from '@modules/presensa/repositories/IPresençaRepository';
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
      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('PrismaTransaction')
      private repoTransaction: ITransactionRepository,

      @inject('Presenca')
      private presencaRepository: IPresencaRespository,

      @inject('PrismaIndication')
      private indRepo: IIndicationRepository,

      @inject('PrismaB2b')
      private repoB2b: IB2bRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(): Promise<any> {
      let ListAllusers = await this.cache.recover<User[]>('users');
      let transaction = await this.cache.recover<Transaction[]>('transaction');
      let listAllPresenca = await this.cache.recover<Presenca[]>('presenca');
      let indi = await this.cache.recover<Indication[]>('indication');
      let b2b = await this.cache.recover<B2b[]>('b2b');
      let allPadrinho = await this.cache.recover<Padrinho[]>('padrinho');

      if (!ListAllusers) {
         ListAllusers = await this.userRepository.listAllUser();
         await this.cache.save('users', ListAllusers);
      }

      if (!transaction) {
         transaction = await this.repoTransaction.listAllTransaction();
         await this.cache.save('transaction', transaction);
      }

      if (!listAllPresenca) {
         listAllPresenca = await this.presencaRepository.listAllPresenca();
         await this.cache.save('presenca', listAllPresenca);
      }

      if (!indi) {
         indi = await this.indRepo.listAll();
         await this.cache.save('indication', indi);
      }

      if (!b2b) {
         b2b = await this.repoB2b.listAllB2b();
         await this.cache.save('b2b', b2b);
      }

      if (!allPadrinho) {
         allPadrinho = await this.userRepository.listAllPadrinho();

         await this.cache.save('padrinho', allPadrinho);
      }

      const Concumo = ListAllusers!
         .map((user, index) => {
            const cons = transaction!.filter(h => h.consumidor_id === user.id);
            const valor =
               cons.reduce((ac, i) => {
                  return ac + Number(i.valor);
               }, 0) / 100;

            const consumo = {
               id: user.id,
               nome: user.nome,
               pontos: cons!.length * ponts.consumo,
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

      const Vendas = ListAllusers!
         .map((user, index) => {
            const cons = transaction!.filter(h => h.prestador_id === user.id);

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

      const Pres = ListAllusers!
         .map(user => {
            const userPresenca = listAllPresenca!.filter(
               h => h.user_id === user.id,
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

      const Ind = ListAllusers!
         .map(user => {
            const fil = indi!.filter(
               h => h.quemIndicou_id === user.id && h.validate === true,
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
               ranck: i + 1,
            };
         });

      const B2 = ListAllusers!
         .map(user => {
            const cons = b2b!.filter(
               h => h.send_id === user.id && h.validate === true,
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

      const padrinho = ListAllusers!
         .map(user => {
            let allP = [];
            if (allPadrinho) {
               allP = allPadrinho.filter(h => h.user_id === user.id);
            }

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

      const Total: PropsTotalPontos[] = [];

      ListAllusers.forEach(user => {
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
      };

      return relatori;
   }
}
