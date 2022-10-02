/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { B2b, User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { IB2bRepository } from '../repositories/IB2bRepository';

@injectable()
export class PontosB2b {
   constructor(
      @inject('PrismaB2b')
      private repoB2b: IB2bRepository,

      @inject('PrismaUser')
      private repoUser: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async exec(): Promise<any> {
      let b2b = await this.cache.recover<B2b[]>('b2b');
      let users = await this.cache.recover<User[]>('list-all-users');

      if (!b2b) {
         b2b = await this.repoB2b.listAllB2b();

         await this.cache.save('b2b', b2b);
      }

      if (!users) {
         users = await this.repoUser.listAllUser();

         await this.cache.save('list-all-users', users);
      }

      const relatorioSend = users
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
         send: relatorioSend,
      };

      return relatori;
   }
}
