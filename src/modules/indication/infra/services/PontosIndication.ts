/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { Indication, User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IIndicationRepository } from '../repositories/IIndicationRepository';

@injectable()
export class PontosIndication {
   constructor(
      @inject('PrismaIndication')
      private indRepo: IIndicationRepository,

      @inject('PrismaUser')
      private userRepo: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(): Promise<any[]> {
      let users = await this.cache.recover<User[]>('list-all-users');
      let indi = await this.cache.recover<Indication[]>('indication');

      if (!users) {
         users = await this.userRepo.listAllUser();

         await this.cache.save('list-all-users', users);
      }

      if (!indi) {
         indi = await this.indRepo.listAll();
         await this.cache.save('indication', indi);
      }

      const pt = users
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

      return pt;
   }
}
