/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { Transaction, User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

type Props = {
   compras: {
      id: string;
      nome: string;
      pontos: number;
      rank: number;
   }[];
   vendas: {
      id: string;
      nome: string;
      pontos: number;
      rank: number;
   }[];
};

@injectable()
export class PontosTransaction {
   constructor(
      @inject('PrismaTransaction')
      private repoTransaction: ITransactionRepository,

      @inject('PrismaUser')
      private repoUser: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async exec(): Promise<Props> {
      let users = await this.cache.recover<User[]>('list-all-users');
      let transaction = await this.cache.recover<Transaction[]>('transaction');

      if (!users) {
         users = await this.repoUser.listAllUser();
         console.log('passou pelo banco');

         await this.cache.save('list-all-users', users);
      }

      if (!transaction) {
         transaction = await this.repoTransaction.listAllTransaction();
         console.log('passou pelo banco');

         await this.cache.save('transaction', transaction);
      }

      const relatorioConsumo = users!
         .map((user, index) => {
            const cons = transaction!.filter(h => h.consumidor_id === user.id);

            const consumo = {
               id: user.id,
               nome: user.nome,
               pontos: cons.length * 10,
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

      const relatorioVendas = users!
         .map((user, index) => {
            const cons = transaction!.filter(h => h.prestador_id === user.id);

            const consumo = {
               id: user.id,
               nome: user.nome,
               pontos: cons.length * 10,
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

      const relatori = {
         compras: relatorioConsumo,
         vendas: relatorioVendas,
      };

      return relatori;
   }
}
