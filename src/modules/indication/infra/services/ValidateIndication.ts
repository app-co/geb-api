import { IConsumoRepository } from '@modules/consumo/repositories/IConsumoRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { Indication } from '@prisma/client';
import { IOrderTransaction } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Transaction } from '.prisma/client';

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

      return up;
   }
}
