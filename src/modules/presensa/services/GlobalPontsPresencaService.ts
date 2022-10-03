/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { OrderPresenca, Presenca, User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IUserDtos } from '@shared/dtos';
import { inject, injectable } from 'tsyringe';

import { pontos } from '../../../utils';
import { IPresencaRespository } from '../repositories/IPresençaRepository';

interface Props {
   nome: string;
   pontos: number;
   quantidade: number;
   rank: number;
}

@injectable()
export class GlobalPontsPresencaService {
   constructor(
      @inject('Presenca')
      private presencaRepository: IPresencaRespository,

      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(): Promise<Props[]> {
      let listAllUser = await this.cache.recover<User[]>('list-all-users');
      let listAllPresenca = await this.cache.recover<Presenca[]>('presenca');
      console.log(listAllPresenca);

      if (!listAllPresenca) {
         listAllPresenca = await this.presencaRepository.listAllPresenca();

         await this.cache.save('presenca', listAllPresenca);
         console.log('pontospresenca: passou pelo banco');
      }

      if (!listAllUser) {
         listAllUser = await this.userRepository.listAllUser();

         await this.cache.save('list-all-users', listAllUser);
         console.log('pontospresenca: passou pelo banco');
      }

      const global = listAllUser!
         .map(user => {
            const userPresenca = listAllPresenca!.filter(
               h => h.user_id === user.id,
            );

            const qnt = userPresenca.length + 1;

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

      return global;
   }
}
