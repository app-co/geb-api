/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { Presenca } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IPresencaRespository } from '../repositories/IPresençaRepository';

interface IProps {
   user_id: string;
}

@injectable()
export class CreatePresencaService {
   constructor(
      @inject('Presenca')
      private presencaRepository: IPresencaRespository,
   ) {}

   async execute({ user_id }: IProps): Promise<Presenca> {
      const find = await this.presencaRepository.list(user_id);

      const created = find.find(h => {
         const dataN = new Date(Date.now()).getHours();
         const dataCreatd = h.createdAt.getHours();
         if (dataCreatd === dataN) {
            return h;
         }
      });

      if (created) {
         throw new Err('Você ja enviou uma solicitaçao de presença');
      }
      const create = await this.presencaRepository.create({
         user_id,
      });

      return create;
   }
}
