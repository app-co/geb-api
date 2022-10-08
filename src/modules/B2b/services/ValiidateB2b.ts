import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { B2b } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IB2bRepository } from '../repositories/IB2bRepository';

@injectable()
export class ValidateB2b {
   constructor(
      @inject('PrismaB2b')
      private b2bRepository: IB2bRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute(id: string, user_id: string): Promise<B2b> {
      // const find = await this.b2bRepository.findById(id);

      // if (!find) {
      //    throw new Err('b2b nao encontrado');
      // }
      // if (user_id !== find.recevid_id) {
      //    throw new Err('você não tem autorização para validar o b2b');
      // }

      // if (find.validate === true) {
      //    throw new Err('b2b já validado');
      // }

      const up = await this.b2bRepository.validate(id);

      await this.cache.invalidate('b2b');
      await this.cache.invalidatePrefix('b2bSend');
      await this.cache.invalidatePrefix('b2bReci');

      return up;
   }
}
