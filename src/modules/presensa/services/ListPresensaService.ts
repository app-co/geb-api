import { Presenca } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { IPresencaDto } from '../Dtos/IPresençaDto';
import { IPresencaRespository } from '../repositories/IPresençaRepository';

@injectable()
export class ListPresensaService {
   constructor(
      @inject('Presenca')
      private presencaRepository: IPresencaRespository,
   ) {}

   async execute(user_id: string): Promise<Presenca[]> {
      const liset = await this.presencaRepository.list(user_id);

      return liset;
   }
}
