import { Presenca } from '@prisma/client';
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
   ) {}

   async execute({ user_id }: Props): Promise<Presenca[]> {
      const liset = await this.presencaRepository.listAllPresenseWithUserId(
         user_id,
      );

      console.log(user_id);

      return liset;
   }
}
