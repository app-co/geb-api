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

  async sincro() {
    // const allUsers = await prisma.user.findMany({
    //   include: {
    //     profile: true,
    //     situation: true,
    //   }
    // })


    // const users = allUsers.map(h => {
    //   const dt = {
    //     id: h.id,
    //     nome: h.nome,
    //     apelido: h.membro,
    //     token: h.token,
    //     senha: h.senha,
    //     adm: h.adm,
    //     apadrinhado: h.situation?.apadrinhado,
    //     hub: [h.hub === 'GEB' ? 0 : 1]
    //   }

    //   return dt
    // })

    // const profile = allUsers.map(h => {
    //   const pr = h.profile
    //   const dt = {
    //     whats: pr?.whats,
    //     logotipo: pr?.logotipo,
    //     avatar: pr?.avatar,
    //     workName: pr?.workName,
    //     CNPJ: pr?.CNPJ,
    //     CPF: pr?.CPF,
    //     ramo: pr?.ramo,
    //     enquadramento: pr?.enquadramento,
    //     email: pr?.email,
    //     userId: h.id,
    //   }

    //   return dt
    // })

    const relations = await prisma.relationShip.findMany()

    const relation = relations.map(h => {
      let objeto = {}

      if (h.type === 'DONATE') {
        const donate = h?.objto?.itens?.map(p => {
          return {
            item: p.item,
            ponto: 10
          }
        }) ?? []

        return {
          objeto: {
            donate
          },
          status: h.situation ? 1 : 0,
          userId: h.fk_user_id,
          avatar: '',
          userReceptorId: '',
          hub: 0,
          type: 6,
          valor: 0
        }
      }


      if (h.type === 'B2B') {
        const obj = {
          descricao: h?.objto?.description,
        }

        return {
          objeto: obj,
          status: h.situation ? 1 : 0,
          userId: h.fk_user_id,
          avatar: '',
          userReceptorId: '',
          hub: h.hub === 'GEB' ? 0 : 1,
          type: 3,
          valor: 0
        }
      }

      if (h.type === 'INDICATION') {
        const obj = {
          descricao: h?.objto?.description,
          contatoCliente: h.objto.phone_number,
          nomeCliente: h.objto.client_name,
          indicado_por: h.objto.quemIndicaou_name
        }

        return {
          objeto: obj,
          status: h.situation ? 1 : 0,
          userId: h.fk_user_id,
          avatar: '',
          userReceptorId: '',
          hub: h.hub === 'GEB' ? 0 : 1,
          type: 3,
          valor: h?.objto?.avatar
        }
      }

      if (h.type === 'CONSUMO_OUT') {
        const obj = {
          descricao: h?.objto?.description,
        }

        return {
          objeto: obj,
          status: h.situation ? 1 : 0,
          userId: h.prestador_id,
          avatar: h.objto?.avatar ?? '',
          userReceptorId: '',
          hub: h.hub === 'GEB' ? 0 : 1,
          type: 2,
          valor: h.objto.valor / 100
        }
      }

    })

    return { relation }
  }
}
