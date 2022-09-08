import { Presenca } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { IPresencaRespository } from '../repositories/IPresençaRepository';

@injectable()
export class ListAllPresensaService {
   constructor(
      @inject('Presenca')
      private presencaRepository: IPresencaRespository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(): Promise<Presenca[]> {
      let list = await this.cache.recover<Presenca[]>('presenca');

      if (!list) {
         list = await this.presencaRepository.listAllPresenca();
         await this.cache.save('presenca', list);

         console.log('presenca: passou pelo banco');
      }

      return list;
   }
}
