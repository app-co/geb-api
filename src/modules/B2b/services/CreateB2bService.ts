import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { B2b } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IB2bRepository } from '../repositories/IB2bRepository';

interface Props {
   send_id: string;
   recevid_id: string;
   appointment: string;
}

@injectable()
export class CreateB2b {
   constructor(
      @inject('PrismaB2b')
      private b2bRepository: IB2bRepository,

      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({ send_id, recevid_id, appointment }: Props): Promise<B2b> {
      const sendUser = await this.userRepository.findById(send_id);
      const recevidUser = await this.userRepository.findById(recevid_id);

      if (!sendUser) {
         throw new Err('usuário não encontrado');
      }

      if (!recevidUser) {
         throw new Err('usuário não encontrado');
      }

      if (sendUser.id === recevid_id) {
         throw new Err('você não pode fazer b2b com você mesmo');
      }

      const create = await this.b2bRepository.create({
         send_id,
         send_name: sendUser.nome,
         recevid_id,
         recevid_name: recevidUser.nome,
         appointment,
         validate: false,
      });

      return create;
   }
}
