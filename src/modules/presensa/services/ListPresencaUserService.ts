import { Presenca } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { inject, injectable } from 'tsyringe';

import { IPresencaRespository } from '../repositories/IPresençaRepository';

interface Props {
   user_id: string;
}

@injectable()
export class ListPresencaUseraService {
   constructor(
      @inject('Presenca')
      private presencaRepository: IPresencaRespository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({ user_id }: Props): Promise<Presenca[]> {
      let list = await this.cache.recover<Presenca[]>(`presenca:${user_id}`);

      if (!list) {
         list = await this.presencaRepository.listAllPresenseWithUserId(
            user_id,
         );
         await this.cache.save(`presenca:${user_id}`, list);
         console.log('presensaUser: passou pelo banco');
      }

      console.log(user_id);

      return list;
   }
}
