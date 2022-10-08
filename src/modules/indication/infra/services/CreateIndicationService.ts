import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { Indication } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IIndicationRepository } from '../repositories/IIndicationRepository';

interface Props {
   indicado_id: string;
   quemIndicou_id: string;
   client_name: string;
   description: string;
   phone_number_client: number;
   quemIndicou_name: string;
   indicado_name: string;
}

@injectable()
export class CreateIndicationService {
   constructor(
      @inject('PrismaIndication')
      private indicationRepo: IIndicationRepository,

      @inject('PrismaUser')
      private userRepo: IUsersRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({
      indicado_id,
      quemIndicou_id,
      client_name,
      description,
      phone_number_client,
      indicado_name,
      quemIndicou_name,
   }: Props): Promise<Indication> {
      const user = await this.userRepo.findById(quemIndicou_id);
      const indicado = await this.userRepo.findById(indicado_id);

      if (!user) {
         throw new Err('usuário não encontrado');
      }

      if (!indicado) {
         throw new Err('usuário não encontrado');
      }

      if (user.id === indicado.id) {
         throw new Err('você não pode fazer uma indicação à você mesmo');
      }

      const crete = await this.indicationRepo.create({
         indicado_id,
         indicado_name,
         quemIndicou_id,
         quemIndicou_name,
         client_name,
         description,
         phone_number_client,
      });

      await this.cache.invalidate(`indication`);
      await this.cache.invalidatePrefix(`indication-indicado`);
      await this.cache.invalidatePrefix('indiQuem');
      return crete;
   }
}
