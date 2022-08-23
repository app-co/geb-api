import auth from '@config/auth';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
   user: {
      id: string;
      nome: string;
      adm: boolean;
   };
   token: string;
}
@injectable()
export class SessionService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) {}

   async execute({ membro, senha }: IRequest): Promise<IResponse> {
      const findUser = await this.userRepository.findByMembro(membro);

      if (!findUser) {
         throw new Err('usuario nao encontrado');
      }

      const compareHash = await compare(senha, findUser.senha!);
      if (!compareHash) {
         throw new Err('senha invalida');
      }
      const { secret, expiresIn } = auth.jwt;
      const token = sign({}, secret, {
         subject: findUser.id,
         expiresIn,
      });

      // const awsUrl = process.env.AWS_URL;

      // const avatar_url = `${awsUrl}avatar/${findUser.avatar}`;
      // const logo_url = `${awsUrl}logo/${findUser.logotipo}`;

      const [nome, sobrenome] = findUser.nome.split(' ').map(String);

      const user = {
         user: {
            id: findUser.id,
            nome,
            adm: findUser.adm,
         },
         token,
      };

      return user;
   }
}
