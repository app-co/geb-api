/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Links, Profile, Stars } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IProfileDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IStarRepository } from '../repositories/IStarRespository';

interface Props {
   fk_id_user: string;
   star: number;
   valiador: string;
}

@injectable()
export class CreateStar {
   constructor(
      @inject('PrismaStar')
      private starRepo: IStarRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({ fk_id_user, star, valiador }: Props): Promise<Stars> {
      const create = await this.starRepo.create({
         fk_id_user,
         star,
         valiador,
      });

      await this.cache.invalidate('users');
      await this.cache.invalidatePrefix(`individualPonts`);

      return create;
   }
}
