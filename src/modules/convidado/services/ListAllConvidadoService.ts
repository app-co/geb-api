import { Convidado, Stars } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { IConvidadoDto } from '@shared/dtos';
import { inject, injectable } from 'tsyringe';

import { IConvidadoPrisma } from '../repositories/IConvidadoPrisma';

@injectable()
export class ListAllConvidadoService {
   constructor(
      @inject('PrismaConvidado')
      private convidadoRepo: IConvidadoPrisma,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async exec(): Promise<Convidado[]> {
      let list = await this.cache.recover<Convidado[]>('convidado');

      if (!list) {
         list = await this.convidadoRepo.listAll();

         await this.cache.save(`convidado`, list);

         console.log('banco list all convidado');
      }

      return list;
   }
}
