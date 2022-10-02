/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IB2bRepository } from '@modules/B2b/repositories/IB2bRepository';
import { PontosB2b } from '@modules/B2b/services/PontosB2b';
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
} from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IUserDtos, IProfileDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { pontos } from '../../../utils';
import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
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
      // let ListAllusers = await this.cache.recover<User[]>('list-all-users');
      // let transaction = await this.cache.recover<Transaction[]>('transaction');
      // let listAllPresenca = await this.cache.recover<Presenca[]>('presenca');
      // let indi = await this.cache.recover<Indication[]>('indication');
      // let b2b = await this.cache.recover<B2b[]>('b2b');
      const ListAllusers = await this.userRepository.listAllUser();
      const transaction = await this.repoTransaction.listAllTransaction();
      const listAllPresenca = await this.presencaRepository.listAllPresenca();
      const indi = await this.indRepo.listAll();
      const b2b = await this.repoB2b.listAllB2b();

      const Concumo = ListAllusers!
         .map((user, index) => {
            const cons = transaction?.filter(h => h.consumidor_id === user.id);
            const valor = cons.reduce((ac, i) => {
               return ac + Number(i.valor);
            }, 0);

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

      const Vendas = ListAllusers!
         .map((user, index) => {
            const cons = transaction!.filter(h => h.prestador_id === user.id);

            const valor = cons.reduce((ac, i) => {
               return ac + Number(i.valor);
            }, 0);

            const consumo = {
               id: user.id,
               nome: user.nome,
               pontos: cons.length * 10,
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
               pontos: qnt * pontos.presenca,
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

            const pont = {
               id: user.id,
               nome: user.nome,
               pontos: fil.length * 10,
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
               pontos: cons.length * 10,
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
      };

      return relatori;
   }
}
