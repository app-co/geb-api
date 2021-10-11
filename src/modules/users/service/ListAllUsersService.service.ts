import { inject, injectable } from 'tsyringe';

import { User } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

@injectable()
export class ListAllUserService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute(): Promise<User[]> {
      const find = await this.userRepository.findAll();
      const awsUrl = 'https://geb.s3.us-east-2.amazonaws.com';

      const users = find.map(h => ({
         ...h,
         logoUrl: h.logotipo ? `${awsUrl}/logo/${h.logotipo}` : undefined,
         avatarUrl: h.avatar ? `${awsUrl}/avatar/${h.avatar}` : undefined,
      }));

      return users;
   }
}
