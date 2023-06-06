/* eslint-disable @typescript-eslint/no-unused-vars */
import { Donate, Prisma } from '@prisma/client';
import ICacheProvider from '@shared/container/providers/model/ICacheProvider';
import { Err } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IDonate } from '../dtos';
import { IDonateRepository } from '../repositories/IRepository/IDonateRepository';

interface props {
   fk_id_user: string;
   itens: string;
}

interface IProps {
   id: string;
}

@injectable()
export class donalte {
   constructor(
      @inject('donate')
      private repoDonate: IDonateRepository,

      @inject('Cache')
      private cache: ICacheProvider,
   ) {}

   async create({ fk_id_user, itens }: props): Promise<Donate> {
      const itm = {
         fk_id_user,
         itens,
      };
      const create = await this.repoDonate.create(itm);

      await this.cache.invalidate('donate');

      return create;
   }

   async findById(id: string): Promise<Donate> {
      const list = await this.repoDonate.findById(id);

      if (!list) {
         throw new Err('Nada encontrado');
      }

      return list;
   }

   async listMany(): Promise<IDonate[]> {
      let list = await this.cache.recover<IDonate[]>('donate');

      if (!list) {
         list = await this.repoDonate.listMany();

         await this.cache.save(`list`, list);
      }

      return list;
   }

   async delete({ id }: IProps): Promise<void> {
      const find = await this.repoDonate.findById(id);

      if (!find) {
         throw new Err('donate not found');
      }

      await this.repoDonate.delete(id);
      await this.cache.invalidate('donate');
   }

   async validate({ id }: IProps): Promise<Donate> {
      const find = await this.repoDonate.findById(id);

      if (!find) {
         throw new Err('donate not found');
      }
      const validate = await this.repoDonate.validate(id);

      await this.cache.invalidate('donate');

      return validate;
   }
}
