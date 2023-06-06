import { Convidado, Stars } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IConvidadoDto } from '@shared/dtos';
import { inject, injectable } from 'tsyringe';

import { IConvidadoPrisma } from '../repositories/IConvidadoPrisma';

interface Props {
   id: string;
}
@injectable()
export class UpdateConvidadoService {
   constructor(
      @inject('PrismaConvidado')
      private convidadoRepo: IConvidadoPrisma,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async exec({ id }: Props): Promise<Convidado> {
      const up = await this.convidadoRepo.update(id);

      await this.cache.invalidate('convidado');

      return up;
   }
}
