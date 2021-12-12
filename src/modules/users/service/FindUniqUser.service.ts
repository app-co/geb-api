import { Err } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { User } from '.prisma/client';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface Props {
   user: User;
   avatar_url: string;
   logo_url: string;
}

interface IRes {
   id: string;
}

@injectable()
export class FindUniqUser {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({ id }: IRes): Promise<any> {
      const user = await this.userRepository.findById(id);

      if (!user) {
         throw new Err('usuario nao encontrado');
      }
      const awsUrl = 'https://geb.s3.us-east-2.amazonaws.com';

      const links = user.links.map(h => {
         return {
            nome: 'whats',
            link: h,
         };
      });

      const users = {
         ...user,
         avatarUrl: `${awsUrl}/avatar/${user.avatar}`,
         logoUrl: `${awsUrl}/logo/${user.logotipo}`,
      };

      return users;
   }
}
