/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Profile, User } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface IPros {
   user_id: string;
}

@injectable()
export class FindProfile {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({ user_id }: IPros): Promise<Profile> {
      const findId = await this.userRepository.findProfileByUserId(user_id);

      console.log('user', user_id);

      if (!findId) {
         throw new Err('profile nao encontrado');
      }

      return findId;
   }
}
