import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { Indication } from '@prisma/client';
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
   ) {}

   async execute(): Promise<any[]> {
      const users = await this.userRepo.listAllUser();
      const indi = await this.indRepo.listAll();

      const pt = users
         .map(user => {
            const fil = indi.filter(
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
