/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { Presenca } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IPresencaRespository } from '../repositories/IPresençaRepository';

interface IProps {
   user_id: string;
   nome: string;
   presenca: boolean;
}

@injectable()
export class CreatePresencaService {
   constructor(
      @inject('Presenca')
      private presencaRepository: IPresencaRespository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({ user_id, nome, presenca }: IProps): Promise<Presenca> {
      const find = await this.presencaRepository.listOrderWithUserId(user_id);

      if (!find) {
         throw new Err('Não há orderm de presença para validar');
      }

      if (find) {
         await this.presencaRepository.deleteOrderPresenca(find.id);
      }

      const create = await this.presencaRepository.create({
         user_id,
         nome,
         presenca,
      });

      await this.cache.invalidate('orderPresenca');
      await this.cache.invalidate('presenca');
      await this.cache.invalidatePrefix('orderPresenca');

      await this.cache.invalidatePrefix('individualPonts');

      return create;
   }
}
