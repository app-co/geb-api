import { Indication } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IIndicationRepository } from '../repositories/IIndicationRepository';

@injectable()
export class ListByIndicado {
   constructor(
      @inject('PrismaIndication')
      private indRepository: IIndicationRepository,
   ) {}

   async execute(id: string): Promise<Indication[]> {
      const list = await this.indRepository.findByIndicado(id);

      return list;
   }
}
