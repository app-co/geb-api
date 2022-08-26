import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { inject, injectable } from 'tsyringe';

import { IB2bRepository } from '../repositories/IB2bRepository';

@injectable()
export class PontosB2b {
   constructor(
      @inject('PrismaB2b')
      private repoB2b: IB2bRepository,

      @inject('PrismaUser')
      private repoUser: IUsersRepository,
   ) {}

   async exec(): Promise<any> {
      const b2b = await this.repoB2b.listAllB2b();
      const users = await this.repoUser.listAllUser();

      const relatorioSend = users
         .map(user => {
            const cons = b2b.filter(
               h => h.send_id === user.id && h.validate === true,
            );

            const send = {
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
         send: relatorioSend,
      };

      return relatori;
   }
}
