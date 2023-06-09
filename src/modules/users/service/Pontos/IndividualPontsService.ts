/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IB2bRepository } from '@modules/B2b/repositories/IB2bRepository';
import { PontosB2b } from '@modules/B2b/services/PontosB2b';
import { IConvidadoPrisma } from '@modules/convidado/repositories/IConvidadoPrisma';
import { IDonateRepository } from '@modules/Donate/repositories/IRepository/IDonateRepository';
import { IIndicationRepository } from '@modules/indication/infra/repositories/IIndicationRepository';
import { IPresencaRespository } from '@modules/presensa/repositories/IPresençaRepository';
import { ITransactionRepository } from '@modules/transaction/repositories/ITransactionRespository';
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
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IUserDtos, IProfileDto, IPadrinhoDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { pontos as ponts } from '../../../../utils/pontos';
import { ListAllB2b } from '../../../B2b/services/ListAllB2b';
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
@injectable()
export class IndicifualPontsService {
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

      @inject('PrismaConvidado')
      private repoConv: IConvidadoPrisma,

      @inject('donate')
      private repoDon: IDonateRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(user_id: string): Promise<any> {
      let ListAllusers = await this.cache.recover<User[]>('users');
      let transaction = await this.cache.recover<Transaction[]>('transaction');
      let listAllPresenca = await this.cache.recover<Presenca[]>('presenca');
      let indi = await this.cache.recover<Indication[]>('indication');
      let b2b = await this.cache.recover<B2b[]>('b2b');
      let allPadrinho = await this.cache.recover<Padrinho[]>('padrinho');
      let allVisitante = await this.cache.recover<Convidado[]>('convidado');
      let allDonates = await this.cache.recover<Donate[]>('donate');

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

      if (!allVisitante) {
         allVisitante = await this.repoConv.listAll();

         await this.cache.save('convidado', allVisitante);
      }

      if (!allDonates) {
         allDonates = await this.repoDon.listMany();

         await this.cache.save('donate', allDonates);
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
            const allP = allPadrinho!.filter(h => h.user_id === user.id);

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

      const convidado = ListAllusers!
         .map(user => {
            const allP = allVisitante!.filter(h => {
               if (h.fk_user_id === user.id && h.approved === true) {
                  return h;
               }
            });

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

      const donates = ListAllusers!
         .map(user => {
            const allP = allDonates!.filter(h => {
               if (h.fk_id_user === user.id && h.approved === true) {
                  return h;
               }
            });

            const pt = allP.length * 50;

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

      let dados = await this.cache.recover<any>(`individualPonts:${user_id}`);

      // if (!dados) {
      dados = {
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
