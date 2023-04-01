/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Links, Profile, Stars } from '@prisma/client';
import { IProfileDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IStarRepository } from '../repositories/IStarRespository';

interface Props {
   fk_user_id: string;
   star: number;
   valiador: string;
}

@injectable()
export class CreateStar {
   constructor(
      @inject('PrismaStar')
      private starRepo: IStarRepository,
   ) {}

   async execute({ fk_user_id, star, valiador }: Props): Promise<Stars> {
      const create = await this.starRepo.create({
         fk_user_id,
         star,
         valiador,
      });

      return create;
   }
}
