/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { OrderPresenca } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IPresencaDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IPresencaRespository } from '../repositories/IPresençaRepository';

@injectable()
export class CreateOrderPresencaService {
   constructor(
      @inject('Presenca')
      private presencaRepository: IPresencaRespository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({ user_id, nome }: IPresencaDto): Promise<OrderPresenca> {
      const find = await this.presencaRepository.listOrderWithId(user_id);

      const dataN = new Date().getHours();
      const dataFind = find?.createdAt.getHours();

      if (find) {
         throw new Err('Você ja enviou uma solicitação de presença');
      }

      if (dataN > 23) {
         throw new Err('Você não pode marcar presença depois das 23 horas');
      }

      const create = await this.presencaRepository.create_order({
         nome,
         user_id,
      });

      await this.cache.invalidate(`orderPresenca`);

      return create;
   }
}
