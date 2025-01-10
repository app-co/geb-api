import { TProfile, TSession, TUser, TUsersByHub } from '@/dto/types';
import { prisma } from '@/lib';
import { AppError } from '@/shared/app-error/AppError';
import { make } from './make';
import RedisCacheProvider from '@/shared/implementations/redis/redis-provider';
import { IUser } from '@/dto/interfaces';
import { compare, hash } from 'bcryptjs';
import axios from 'axios';
import { env } from '@/env';


export class UserService {

  constructor(
    private redis: RedisCacheProvider
  ) { }

  async create(obj: Omit<TUser, 'id'>) {
    const user = await prisma.user.findUnique({
      where: { apelido: obj.apelido }
    })

    if (user) throw new AppError('Usuário já cadastrado')

    const senha = await hash(obj.senha, 6)

    const data = await prisma.user.create({
      data: {
        ...obj,
        senha
      }
    })

    const us = await this.getUserById(data.id)

    await this.redis.save(`${data.id}:user`, us)
    await this.redis.invalidate('users')

    return us
  }

  async getUserById(userId: string) {
    let user = await this.redis.recover<IUser>(`${userId}:user`)


    if (!user) {
      user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          profile: true,
        }
      }) as IUser;

      await this.redis.save(`${userId}:user`, user)
    }

    return user
  }

  async userByHub({ hub, nome, pageNumber, pageSize, userId }: TUsersByHub) {

    console.log(hub)
    if (nome && nome.length < 4) return

    const totalUsers = await prisma.user.count()

    const users = await prisma.user.findMany({
      where: {
        hub: { hasSome: hub },
        AND: {
          nome: {
            contains: nome,
            mode: 'insensitive'
          }
        },
        NOT: {
          id: userId,
        }
      },
      include: {
        profile: true,
        Stars: true,
      },
      orderBy: { nome: 'asc' },
      take: pageSize,
      skip: pageNumber
    });

    const us = users.map(h => {
      const lengthStar = h.Stars.length
      if (lengthStar === 0) return {
        ...h,
        avalicaoes: 5
      }

      const soma = h.Stars.reduce((ac, item) => ac + item.star, 0)
      const avaliacoes = soma / lengthStar

      return {
        ...h,
        avaliacoes
      }
    })


    const paginated = {
      totalPages: Math.round(totalUsers / pageSize),
      currentPage: Number(pageNumber) / Number(pageSize) + 1,
      totalRecords: totalUsers,
      pageSize,
      pageNumber,
      totalRecordsPerPage: totalUsers % Number(pageSize) === 0 ? Number(pageSize) : totalUsers % Number(pageSize),
      records: us,
    };



    return paginated
  }

  async listAll() {
    let users = await this.redis.recover<TUser[]>('users')

    if (!users) {
      users = await prisma.user.findMany({
        orderBy: { nome: 'asc' },
      }) as TUser[];
      await this.redis.save('users', users)

    }

    return users
  }

  async registerProfile(obj: Omit<TProfile, 'id'>) {
    const profile = await prisma.profile.findUnique({
      where: { userId: obj.userId }
    })

    if (!profile) {
      const data = await prisma.profile.create({
        data: {
          ...obj
        }
      })
      await this.redis.invalidate(`${obj.userId}:user`)

      return data
    }

    const data = await prisma.profile.update({
      where: { userId: obj.userId },
      data: {
        ...obj
      }
    })


    await this.redis.invalidate(`${obj.userId}:user`)

    return data
  }

  async updateUser(obj: TUser) {
    const user = await prisma.user.findUnique({
      where: { id: obj.id }
    })

    if (!user) throw new AppError('Usuário não encontrado')

    let senha = null

    if (obj.senha) {
      senha = await hash(obj.senha, 6)
    }

    let dt = {}

    if (senha) {
      dt = {
        ...obj,
        senha
      }
    } else {
      dt = {
        nome: obj.nome,
        apelido: obj.apelido,
        adm: obj.adm,
        apadrinhado: obj.apadrinhado,
        hub: obj.hub,
      }
    }

    const data = await prisma.user.update({
      where: { id: obj.id },
      data: dt
    })

    await this.redis.invalidate(`${obj.id}:user`)
    await this.redis.invalidate('users')

    return data
  }

  async updateProfile(obj: TProfile) {
    const profile = await prisma.profile.findUnique({
      where: { userId: obj.userId }
    })

    if (!profile) throw new AppError('Perfil não encontrado')

    const data = await prisma.profile.update({
      where: { userId: obj.userId },
      data: {
        ...obj
      }
    })

    await this.redis.invalidate(`${obj.userId}:user`)

    return data
  }

  async deleteUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) throw new AppError('Usuário não encontrado')

    await prisma.user.delete({
      where: { id: userId }
    })

    await this.redis.invalidate(`${userId}:user`)
    await this.redis.invalidate('users')

    return 'Usuário excluído com sucesso'
  }

  async session(obj: TSession) {
    const user = await prisma.user.findUnique({
      where: { apelido: obj.apelido }
    })

    if (!user) throw new AppError('Usuário não encontrado')

    const compareSenha = await compare(obj.senha, user.senha!)

    const pass = env.ADM_ACCESS === obj.senha



    if (!compareSenha) {
      if (!pass) throw new AppError('Senha inválida')
    }

    return user
  }

  async sincron() {
    const { data } = await axios.get('http://192.168.0.66:3334/user/sincro')

    const relation = data.relation.filter(h => h)

    const r = await prisma.relationShip.createMany({
      data: relation
    })

    return r
  }

  async star(userId: string, star: number) {
    await prisma.stars.create({
      data: {
        userId,
        star,
      }
    })

    await this.redis.invalidatePrefix(`${userId}:user`)
    await this.redis.invalidate('users')
  }

}