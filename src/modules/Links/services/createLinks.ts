/* eslint-disable @typescript-eslint/no-unused-vars */
import { Links, Prisma, midia } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { ILinkDto } from '@shared/dtos';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { ILinksRepository } from '../repositories/IRepository/ILinksRepository';

interface props {
   id: string;
}

@injectable()
export class createLinks {
   constructor(
      @inject('Link')
      private repoLinks: ILinksRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async create({ nome, link, fk_user_id }: ILinkDto): Promise<midia> {
      const find = await this.repoLinks.findByName(nome);

      if (find) {
         throw new Err('Você já tem esse link');
      }

      const create = await this.repoLinks.create({
         nome,
         link,
         fk_user_id,
      });

      await this.cache.invalidate('users');
      await this.cache.invalidate('links');

      return create;
   }

   async listMany(fk_user_id: string): Promise<midia[]> {
      let list = await this.cache.recover<midia[]>('links');

      if (!list) {
         list = await this.repoLinks.listByUser(fk_user_id);

         await this.cache.save(`links`, list);

         console.log('banco list all links');
      }

      return list;
   }
}
