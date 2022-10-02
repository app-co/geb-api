import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { B2b } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IB2bRepository } from '../repositories/IB2bRepository';

interface Props {
   send_id: string;
   send_name: string;
   recevid_name: string;
   recevid_id: string;
   appointment: string;
   assunto: string;
   validate: boolean;
}

@injectable()
export class CreateB2b {
   constructor(
      @inject('PrismaB2b')
      private b2bRepository: IB2bRepository,

      @inject('PrismaUser')
      private userRepository: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({
      send_id,
      recevid_id,
      send_name,
      recevid_name,
      appointment,
      assunto,
      validate,
   }: Props): Promise<B2b> {
      const sendUser = await this.userRepository.findById(send_id);
      const recevidUser = await this.userRepository.findById(recevid_id);

      // if (!sendUser) {
      //    throw new Err('usuário não encontrado');
      // }

      // if (!recevidUser) {
      //    throw new Err('usuário não encontrado');
      // }

      // if (sendUser.id === recevid_id) {
      //    throw new Err('você não pode fazer b2b com você mesmo');
      // }

      const create = await this.b2bRepository.create({
         send_id,
         send_name,
         recevid_id,
         recevid_name,
         appointment,
         validate,
         assunto,
      });

      await this.cache.invalidate('b2b');
      await this.cache.invalidatePrefix('b2bSend');
      await this.cache.invalidatePrefix('b2bReci');

      return create;
   }
}
