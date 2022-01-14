/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-multi-assign */
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { User } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface IUsers {
   user_id: string;
}
@injectable()
export class UpdatePadrinhoService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({ user_id }: IUsers): Promise<User> {
      const find = await this.userRepository.findById(user_id);

      if (!find) {
         throw new Err('user not found');
      }

      const pd = (find.padrinhQuantity! += 1);

      const up = await this.userRepository.updatePadrinho(user_id, pd);

      return up;
   }
}
