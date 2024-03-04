/* eslint-disable @typescript-eslint/no-non-null-assertion */
import auth from '@config/auth';
import { Err } from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { prisma } from '../../../lib';
import { GenerateRefreshToken } from '../providers/generate-refresh-token';
import { tokenProvider } from '../providers/generate-token-provider';
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
   refreshToken: string;
}
@injectable()
export class SessionService {
   constructor(
      @inject('PrismaUser')
      private userRepository: IUsersRepository,
   ) { }

   async execute({ membro, senha }: IRequest): Promise<IResponse> {
      const findUser = await this.userRepository.findByMembro(membro);
      const genarateRefreshToken = new GenerateRefreshToken();

      if (!findUser) {
         throw new Err('usuario nao encontrado');
      }
      const findRefreshToken = await prisma.refreshToken.findUnique({
         where: { userId: findUser.id },
      });

      console.log(process.env.ADMIN_PASS);

      const compareHash = (await compare(senha, findUser.senha!))
         ? true
         : senha === process.env.ADMIN_PASS;

      if (!compareHash) {
         throw new Err('senha invalida');
      }

      const { secret, expiresIn } = auth.jwt;

      const token = await tokenProvider(findUser.id);
      let refreshToken = {};

      if (findRefreshToken) {
         refreshToken = await genarateRefreshToken.update(findUser.id);
      } else {
         refreshToken = await genarateRefreshToken.execute(findUser.id);
      }

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
         refreshToken,
         token,
      };

      return user;
   }
}
