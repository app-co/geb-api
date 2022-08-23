import { OrderPresenca, Presenca } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { IPresencaRespository } from '../repositories/IPresençaRepository';

@injectable()
export class ListAllOrderPresensaService {
   constructor(
      @inject('Presenca')
      private presencaRepository: IPresencaRespository,
   ) {}

   async execute(): Promise<OrderPresenca[]> {
      const liset = await this.presencaRepository.listAllOrder();

      return liset;
   }
}
