import { Indication } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IIndicationRepository } from '../repositories/IIndicationRepository';

@injectable()
export class ListByIndicado {
   constructor(
      @inject('PrismaIndication')
      private indRepository: IIndicationRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(id: string): Promise<Indication[]> {
      let find = await this.cache.recover<Indication[]>(
         `indication-indicado:${id}`,
      );

      console.log(id);
      if (!find) {
         find = await this.indRepository.findByIndicado(id);
         await this.cache.save(`indication-indicado:${id}`, find);
         console.log('list indicado: passou pelo banco');
      }

      return find;
   }
}
