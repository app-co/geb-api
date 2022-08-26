import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { B2b } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IB2bRepository } from '../repositories/IB2bRepository';

@injectable()
export class FindB2bBySendId {
   constructor(
      @inject('PrismaB2b')
      private b2bRepository: IB2bRepository,
   ) {}

   async execute(id: string): Promise<B2b[]> {
      const find = await this.b2bRepository.findB2bBySendId(id);

      if (!find) {
         throw new Err('usuário nao encontrado');
      }

      return find;
   }
}
