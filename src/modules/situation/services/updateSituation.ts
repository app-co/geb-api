/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SituationUser } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IProfileDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { ISituationDto } from '../dtos';
import { ISituationPrisma } from '../repositories/ISituationPrisma';

interface Props {
   fk_user_id: string;
   name_convidado: string;
}

@injectable()
export class UpdateSituationService {
   constructor(
      @inject('PrismaSituation')
      private situationRepo: ISituationPrisma,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({
      firstLogin,
      apadrinhado,
      fk_id_user,
      logado,
      id,
      inativo,
   }: ISituationDto): Promise<SituationUser> {
      const create = await this.situationRepo.update({
         firstLogin,
         apadrinhado,
         id,
         fk_id_user,
         logado,
         inativo,
      });

      await this.cache.invalidate('users');

      return create;
   }
}
