/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { Presenca } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IPresencaRespository } from '../repositories/IPresençaRepository';

interface IProps {
   id: string;
}

@injectable()
export class DeletePresensa {
   constructor(
      @inject('Presenca')
      private presencaRepository: IPresencaRespository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({ id }: IProps): Promise<void> {
      const find = await this.presencaRepository.listOrderWithId(id);
      console.log(id);

      if (!find) {
         throw new Err('Presensa nao encontrada');
      }

      await this.presencaRepository.deleteOrderPresenca(find.id);

      await this.cache.invalidate('orderPresenca');
      await this.cache.invalidatePrefix('presenca');
   }
}
