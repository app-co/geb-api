/* eslint-disable @typescript-eslint/no-unused-vars */
import { midia, Prisma } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { ILinksRepository } from '../repositories/IRepository/ILinksRepository';


interface props {
   id: string;
}

@injectable()
export class updateLinkService {
   constructor(
      @inject('link')
      private repomidia: ILinksRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async create({}:): Promise<midia> {}

   async findById({ id }: props): Promise<midia> {
      const list = await this.repomidia.findById(id);

      if (!list) {
         throw new Err('Nada encontrado');
      }

      return list;
   }

   async listMany(): Promise<midia[]> {
      const list = await this.repomidia.listMany();

      return list;
   }
}
