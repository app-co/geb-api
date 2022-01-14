import { Presenca } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { IPresencaRespository } from '../repositories/IPresençaRepository';

@injectable()
export class ListAllPresensaService {
   constructor(
      @inject('Presenca')
      private presencaRepository: IPresencaRespository,
   ) {}

   async execute(): Promise<Presenca[]> {
      const liset = await this.presencaRepository.listAll();

      return liset;
   }
}
