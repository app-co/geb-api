import { TDonate, TRelationships } from '@/dto/types';
import { prisma } from '@/lib';
import { AppError } from '@/shared/app-error/AppError';
import RedisCacheProvider from '@/shared/implementations/redis/redis-provider';
import { UserService } from '../user/service';
import { IRelationship } from '@/dto/interfaces';
import { _convertionType, _pontos } from '@/shared/utils/convertions'

interface I {
  qnt: number
  pontos: number
  nome: string
  type: number
  type_str: string
  userId: string
}


export class RelationshipService {

  constructor(
    private redis: RedisCacheProvider,
    private user: UserService
  ) { }

  async register(obj: Omit<TRelationships, 'id' | 'avatar'>) {
    const user = await this.user.getUserById(obj.userId)

    if (!user) throw new AppError('Usuário não encontrado')


    if (obj.type === 8) {
      console.log(obj)
      const userReceptor = await prisma.user.findUnique({ where: { id: obj.userReceptorId! } })

      const reletion = await prisma.relationShip.create({
        data: {
          ...obj,
          status: 1,
          avatar: user?.profile?.avatar ?? "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg",
        }
      })

      if (userReceptor) {
        await prisma.user.update({
          where: { id: userReceptor.id },
          data: {
            apadrinhado: true
          }
        })
      }
      return
    }

    const reletion = await prisma.relationShip.create({
      data: {
        ...obj,
        avatar: user?.profile?.avatar ?? "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg",
      }
    })


    await this.redis.invalidate('relationships')
    await this.redis.invalidatePrefix(obj.userId)
    return reletion
  }

  async all() {
    let relations = await this.redis.recover<TRelationships[]>('relationships')


    if (!relations) {
      relations = await prisma.relationShip.findMany({ orderBy: { type: 'asc' } }) as TRelationships[];

      await this.redis.save('relationships', relations)

    }

    const rl = relations.map(h => {
      return {
        ...h,
        type_str: _convertionType[h.type] ?? "Desconhecido"
      }
    })
    return rl
  }

  async byUser(userId: string) {
    let relations = await this.redis.recover<TRelationships[]>(`${userId}:relationships`)

    if (!relations) {
      relations = await prisma.relationShip.findMany({
        where: { userId },
        orderBy: { type: 'asc' }
      }) as TRelationships[]
    }

    const rl = relations.map(h => {
      return {
        ...h,
        type_str: _convertionType[h.type] ?? "Desconhecido"
      }
    })


    return rl
  }

  async byReceptor(receptorId: string) {
    let relations = await this.redis.recover<TRelationships[]>(`${receptorId}:relationships`)

    if (!relations) {
      relations = await prisma.relationShip.findMany({
        where: { userReceptorId: receptorId },
        orderBy: { type: 'asc' }
      }) as TRelationships[]
    }

    const rl = relations.map(h => {
      return {
        ...h,
        type_str: _convertionType[h.type] ?? "Desconhecido"
      }
    })


    return rl
  }

  async relationForAprovation(userId: string) {
    const relations = await prisma.relationShip.findMany({
      where: {
        userReceptorId: userId,
        status: 0
      }
    })

    return relations
  }

  async validate(relationId: number) {
    const relation = await prisma.relationShip.findFirst({ where: { id: relationId } })

    if (!relation) throw new AppError('Relacionamento não encontrado')

    if (relation.status === 1) throw new AppError('Relacionamento já aprovado')

    const userProvider = await this.user.getUserById(relation.userId)


    if (relation.type === 1) {


      await prisma.relationShip.create({
        data: {
          userId: relation.userReceptorId!,
          type: 2,
          status: 1,
          avatar: userProvider?.profile?.avatar ?? "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg",
          valor: relation.valor,
          hub: relation.hub,
          objeto: relation.objeto!
        }
      })
    }

    await prisma.relationShip.update({
      where: { id: relationId },
      data: { status: 1 }
    })

    await this.redis.invalidate('relationships')
    await this.redis.invalidatePrefix(relation.userId)
    await this.redis.invalidatePrefix(relation?.userReceptorId ?? '')
  }

  async validateMany(relationId: number[]) {
    const relation = await prisma.relationShip.findMany({ where: { id: { in: relationId } } })

    if (!relation) throw new AppError('Relacionamento não encontrado')

    if (relation.length > 0) throw new AppError('Relacionamentos já aprovados')

    await prisma.relationShip.updateMany({
      where: { id: { in: relationId } },
      data: { status: 1 }
    })

    await this.redis.removeAll()
  }

  async podiun(userId: string) {
    const users = await this.user.listAll()
    const relationships = await this.all()

    const types = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    let position: { [key: string]: any } = {}
    let aprovaded: { [key: string]: TRelationships[] } = {}
    let notAprovaded: { [key: string]: TRelationships[] } = {}
    let totalPontos = 0

    const Position = []


    types.forEach(t => {
      let item: I[] = []

      users.forEach(user => {
        let metrica = {
          qnt: 0,
          pontos: 0,
          type: t,
          nome: user.nome,
          userId: user.id,
          type_str: _convertionType[t] ?? "Desconhecido",
        }

        const itensAproveded = relationships.filter(r => {
          if (r.status === 1 && r.userId === user.id && r.type !== 6 && r.type === t) {
            return r
          }
        })

        if (t === 6) {
          let pt = 0
          const donates = relationships.filter(h => h.type === 6 && h.userId === user.id && h.status === 1)

          donates.forEach((h) => {
            const donate = h.objeto.donate as TDonate[]
            if (donate && donate.length > 0) {
              const calc = donate.reduce((ac, i) => ac + i.ponto, 0)
              pt += calc

            }
          })
          metrica.pontos += pt

        }

        metrica.qnt += itensAproveded.length
        metrica.pontos += itensAproveded.length * _pontos[t]

        item.push(metrica)
      })


      const rl = item
        .sort((a, b) => b.pontos - a.pontos)
        .map((h, i) => {
          return {
            pontos: h.pontos,
            userId: h.userId,
            nome: h.nome,
            rank: i + 1,
            qnt: h.qnt,
            type_str: h?.type_str
          }
        })
        .find(h => h.userId === userId)


      const aprov = relationships.filter(h => h.userId === userId && h.status === 1 && h.type === t)
      const notAprov = relationships.filter(h => h.userId === userId && h.status === 0 && h.type === t)

      position[_convertionType[t]] = rl



      Position.push(rl)
      aprovaded[_convertionType[t]] = aprov
      notAprovaded[_convertionType[t]] = notAprov

      totalPontos += rl?.pontos

    })

    const currncyYear = await prisma.anoCorrente.findFirst()

    const globalCurrency = relationships.filter(h => h.type === 1 && h.status === 1).reduce((ac, h) => ac + h.valor, currncyYear?.price)

    const currencyVenda = aprovaded.VENDA.reduce((ac, item) => ac + item.valor, 0) ?? 0


    const validations = {
      position: Position,
      aprovaded,
      notAprovaded,
      totalPontos,
      currencyVenda,
      globalCurrency
    }

    return validations
  }

  async notValides(type: number) {
    const relatons = await prisma.relationShip.findMany({
      where: { type, status: 0 },
      orderBy: { status: 'asc' }
    })

    return relatons
  }

  async deleteRealation(id: number) {
    const relation = await prisma.relationShip.findFirst({ where: { id } })

    if (!relation) throw new AppError('Relacionamento não encontrado')

    await prisma.relationShip.delete({ where: { id } })

    await this.redis.invalidate('relationships')
    await this.redis.invalidatePrefix(relation.userId)
    await this.redis.invalidatePrefix(relation?.userReceptorId ?? '')
  }
}