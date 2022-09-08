import { Indication } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IIndicationRepository } from '../repositories/IIndicationRepository';

@injectable()
export class ListByWhoIndService {
   constructor(
      @inject('PrismaIndication')
      private indRepository: IIndicationRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(id: string): Promise<Indication[]> {
      let list = await this.cache.recover<Indication[]>(`indiQuem:${id}`);

      if (!list) {
         list = await this.indRepository.findByQuemIndicou(id);

         await this.cache.save(`indiQuem:${id}`, list);
      }

      return list;
   }
}
