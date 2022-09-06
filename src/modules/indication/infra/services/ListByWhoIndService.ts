import { Indication } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IIndicationRepository } from '../repositories/IIndicationRepository';

@injectable()
export class ListByWhoIndService {
   constructor(
      @inject('PrismaIndication')
      private indRepository: IIndicationRepository,
   ) {}

   async execute(id: string): Promise<Indication[]> {
      const list = await this.indRepository.findByQuemIndicou(id);

      return list;
   }
}
