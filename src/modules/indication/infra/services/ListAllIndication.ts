import { Indication } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { IIndicationRepository } from '../repositories/IIndicationRepository';

@injectable()
export class ListAllIndication {
   constructor(
      @inject('PrismaIndication')
      private indRepo: IIndicationRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(): Promise<Indication[]> {
      let find = await this.cache.recover<Indication[]>('indication');

      if (!find) {
         find = await this.indRepo.listAll();

         await this.cache.save('indication', find);
      }

      return find;
   }
}
