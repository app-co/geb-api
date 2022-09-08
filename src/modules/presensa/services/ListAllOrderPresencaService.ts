import { OrderPresenca, Presenca } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { IPresencaRespository } from '../repositories/IPresençaRepository';

@injectable()
export class ListAllOrderPresensaService {
   constructor(
      @inject('Presenca')
      private presencaRepository: IPresencaRespository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(): Promise<OrderPresenca[]> {
      let list = await this.cache.recover<OrderPresenca[]>('orderPresenca');

      if (!list) {
         list = await this.presencaRepository.listAllOrder();
         await this.cache.save('orderPresenca', list);
         console.log('orderpresenca: passou pelo banco');
      }

      return list;
   }
}
