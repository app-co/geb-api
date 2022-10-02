/* eslint-disable @typescript-eslint/no-unused-vars */
import { IConsumoRepository } from '@modules/consumo/repositories/IConsumoRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { Indication, Transaction } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IOrderTransaction } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IIndicationRepository } from '../repositories/IIndicationRepository';

interface Props {
   indicado_id: string;
   indication_id: string;
}

@injectable()
export class ValidateIndicationService {
   constructor(
      @inject('PrismaIndication')
      private indicationRepo: IIndicationRepository,

      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({ indicado_id, indication_id }: Props): Promise<Indication> {
      const find = await this.indicationRepo.findById(indication_id);

      if (!find) {
         throw new Err('Indicação não encontrada');
      }

      if (find.indicado_id !== indicado_id) {
         throw new Err('você não tem atorização para validar');
      }

      if (find.validate === true) {
         throw new Err('Indicação ja validada');
      }

      const up = await this.indicationRepo.validate(find.id);

      await this.cache.invalidate(`indication`);
      await this.cache.invalidatePrefix(`indication-indicado`);
      await this.cache.invalidatePrefix('indiQuem');

      return up;
   }
}
