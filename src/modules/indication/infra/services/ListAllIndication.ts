import { Indication } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IIndicationRepository } from '../repositories/IIndicationRepository';

@injectable()
export class ListAllIndication {
   constructor(
      @inject('PrismaIndication')
      private indRepo: IIndicationRepository,
   ) {}

   async execute(): Promise<Indication[]> {
      const find = await this.indRepo.listAll();

      return find;
   }
}
