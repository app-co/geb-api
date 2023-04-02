import { Stars } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { IStarRepository } from '../repositories/IStarRespository';

@injectable()
export class CreateStar {
   constructor(
      @inject('PrismaStar')
      private starRepo: IStarRepository,
   ) {}

   async exec(): Promise<void> {}
}
