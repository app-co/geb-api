import auth from '@config/auth';
import { User } from '@prisma/client';
import { Err } from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRespository';

interface IRequest {
   membro: string;
   senha: string;
}

interface IResponse {
   user: User;
   avatar_url: string;
   logo_url: string;
   token: string;
}
@injectable()
export class SessionService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({ membro, senha }: IRequest): Promise<IResponse> {
      const user = await this.userRepository.findByMembro(membro);

      if (!user) {
         throw new Err('usuario nao encontrado');
      }

      const compareHash = await compare(senha, user.senha);
      if (!compareHash) {
         throw new Err('senha invalida');
      }
      const { secret, expiresIn } = auth.jwt;
      const token = sign({}, secret, {
         subject: user.id,
         expiresIn,
      });

      const awsUrl = 'https://geb.s3.us-east-2.amazonaws.com/avatar/';

      const avatar_url = `${awsUrl}${user.avatar}`;
      const logo_url = `${awsUrl}${user.logotipo}`;

      return { user, token, avatar_url, logo_url };
   }
}
