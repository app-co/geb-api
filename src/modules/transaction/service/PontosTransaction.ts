import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { inject, injectable } from 'tsyringe';

import { ITransactionRepository } from '../repositories/ITransactionRespository';

@injectable()
export class PontosTransaction {
   constructor(
      @inject('PrismaTransaction')
      private repoTransaction: ITransactionRepository,

      @inject('PrismaUser')
      private repoUser: IUsersRepository,
   ) {}

   async exec(): Promise<any> {
      const transaction = await this.repoTransaction.listAllTransaction();
      const users = await this.repoUser.listAllUser();

      const relatorioConsumo = users
         .map((user, index) => {
            const cons = transaction.filter(h => h.consumidor_id === user.id);

            const consumo = {
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

      const relatorioVendas = users
         .map((user, index) => {
            const cons = transaction.filter(h => h.prestador_id === user.id);

            const consumo = {
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
