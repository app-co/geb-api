import { Indication } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IIndicationRepository } from '../repositories/IIndicationRepository';

@injectable()
export class DeleteIndicationService {
   constructor(
      @inject('PrismaIndication')
      private indRepository: IIndicationRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(id: string): Promise<Indication> {
      const find = await this.indRepository.findById(id);

      if (!find) {
         throw new Err('indicação não encontrada');
      }

      const del = await this.indRepository.delete(id);

      await this.cache.invalidate(`indication`);
      await this.cache.invalidatePrefix(`indication`);

      return del;
   }
}
