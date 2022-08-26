import { IUsersRepository } from '@modules/users/repositories/IUsersRespository';
import { B2b } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IB2bRepository } from '../repositories/IB2bRepository';

@injectable()
export class ListAllB2b {
   constructor(
      @inject('PrismaB2b')
      private b2bRepository: IB2bRepository,
   ) {}

   async execute(): Promise<B2b[]> {
      const create = await this.b2bRepository.listAllB2b();

      return create;
   }
}
