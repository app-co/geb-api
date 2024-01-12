/* eslint-disable @typescript-eslint/no-unused-vars */
import { IStarRepository } from '@modules/starts/repositories/IStarRespository';
import { HUB, User } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { prisma } from '../../../utils/prisma';
import { IUsersRepository } from '../repositories/IUsersRespository';

interface IListUser {
   hub: HUB;
}

@injectable()
export class ListAllUser {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('PrismaStar')
      private starRepo: IStarRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) { }

   async execute({ hub = 'GEB' }: IListUser): Promise<User[]> {
      let users = await this.cache.recover<User[]>('get-users');

      if (!users) {
         users = await prisma.user.findMany({
            where: { hub },
            include: {
               situation: true,
               profile: true,
               region: true,
               DadosFire: true,
               Stars: true,
               midia: true,
               Convidados: true,
               RelationShip: true,
            },
            orderBy: { nome: 'asc' },
         });
      }

      return users;
   }
}
