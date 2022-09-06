import { Indication } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IIndicationRepository } from '../repositories/IIndicationRepository';

@injectable()
export class DeleteIndicationService {
   constructor(
      @inject('PrismaIndication')
      private indRepository: IIndicationRepository,
   ) {}

   async execute(id: string): Promise<Indication> {
      const find = await this.indRepository.findById(id);

      if (!find) {
         throw new Err('indicação não encontrada');
      }

      const del = await this.indRepository.delete(id);

      return del;
   }
}
