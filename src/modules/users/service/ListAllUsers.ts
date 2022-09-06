import { User } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

@injectable()
export class ListAllUser {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute(): Promise<User[]> {
      const list = await this.userRepository.listAllUser();

      return list;
   }
}
