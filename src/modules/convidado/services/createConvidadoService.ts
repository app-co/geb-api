/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Convidado, Links, Profile, Stars } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IProfileDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IConvidadoPrisma } from '../repositories/IConvidadoPrisma';

interface Props {
   fk_user_id: string;
   name_convidado: string;
}

interface IProps {
   id: string;
}

@injectable()
export class CreateConvidadoService {
   constructor(
      @inject('PrismaConvidado')
      private convidadoRepo: IConvidadoPrisma,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async execute({ fk_user_id, name_convidado }: Props): Promise<Convidado> {
      const create = await this.convidadoRepo.create({
         fk_user_id,
         name_convidado,
      });

      await this.cache.invalidate('convidado');

      return create;
   }

   async delete({ id }: IProps): Promise<void> {
      const create = await this.convidadoRepo.delete(id);

      await this.cache.invalidate('convidado');
   }
}
