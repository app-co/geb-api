import { eachDayOfInterval, isThursday } from 'date-fns';

import { TDonate, TRelationships } from '@/dto/types';
import { prisma } from '@/lib';
import { AppError } from '@/shared/app-error/AppError';
import RedisCacheProvider from '@/shared/implementations/redis/redis-provider';
import { _convertionType, _pontos } from '@/shared/utils/convertions';
import { _toCurrency } from '@/shared/utils/toCorrency';
import { _toPorcent } from '@/shared/utils/toPercent';

import { UserService } from '../user/service';

interface I {
  qnt: number;
  pontos: number;
  nome: string;
  type: number;
  type_str: string;
  userId: string;
}

export class RelationshipService {
  constructor(private redis: RedisCacheProvider, private user: UserService) { }

  async register(obj: Omit<TRelationships, 'id' | 'avatar'>) {
    const user = await this.user.getUserById(obj.userId);

    if (!user) throw new AppError('Usuário não encontrado');

    if (obj.type === 8) {
      console.log(obj);
      const userReceptor = await prisma.user.findUnique({
        where: { id: obj.userReceptorId! },
      });

      const reletion = await prisma.relationShip.create({
        data: {
          ...obj,
          status: 1,
          avatar:
            user?.profile?.avatar ??
            'https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg',
        },
      });

      if (userReceptor) {
        await prisma.user.update({
          where: { id: userReceptor.id },
          data: {
            apadrinhado: true,
          },
        });
      }
      return;
    }

    const reletion = await prisma.relationShip.create({
      data: {
        ...obj,
        avatar:
          user?.profile?.avatar ??
          'https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg',
      },
    });

    await this.redis.invalidate('relationships');
    await this.redis.invalidatePrefix(obj.userId);
    return reletion;
  }

  async all() {
    let relations = await this.redis.recover<TRelationships[]>('relationships');

    if (!relations) {
      relations = (await prisma.relationShip.findMany({
        orderBy: { type: 'asc' },
      })) as TRelationships[];

      await this.redis.save('relationships', relations);
    }

    const rl = relations.map(h => {
      return {
        ...h,
        type_str: _convertionType[h.type] ?? 'Desconhecido',
      };
    });
    return rl;
  }

  async byUser(userId: string) {
    let relations = await this.redis.recover<TRelationships[]>(
      `${userId}:relationships`,
    );

    if (!relations) {
      relations = (await prisma.relationShip.findMany({
        where: { userId },
        orderBy: { type: 'asc' },
      })) as TRelationships[];
    }

    const rl = relations.map(h => {
      return {
        ...h,
        type_str: _convertionType[h.type] ?? 'Desconhecido',
      };
    });

    return rl;
  }

  async byReceptor(receptorId: string) {
    let relations = await this.redis.recover<TRelationships[]>(
      `${receptorId}:relationships`,
    );

    if (!relations) {
      relations = (await prisma.relationShip.findMany({
        where: { userReceptorId: receptorId },
        orderBy: { type: 'asc' },
      })) as TRelationships[];
    }

    const rl = relations.map(h => {
      return {
        ...h,
        type_str: _convertionType[h.type] ?? 'Desconhecido',
      };
    });

    return rl;
  }

  async relationForAprovation(userId: string) {
    const relations = await prisma.relationShip.findMany({
      where: {
        userReceptorId: userId,
        status: 0,
      },
    });

    return relations;
  }

  async validate(relationId: number) {
    const relation = await prisma.relationShip.findFirst({
      where: { id: relationId },
    });

    if (!relation) throw new AppError('Relacionamento não encontrado');

    if (relation.status === 1) throw new AppError('Relacionamento já aprovado');

    const userProvider = await this.user.getUserById(relation.userId);

    if (relation.type === 1) {
      await prisma.relationShip.create({
        data: {
          userId: relation.userReceptorId!,
          type: 2,
          status: 1,
          avatar:
            userProvider?.profile?.avatar ??
            'https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg',
          valor: relation.valor,
          hub: relation.hub,
          objeto: relation.objeto!,
        },
      });
    }

    await prisma.relationShip.update({
      where: { id: relationId },
      data: { status: 1 },
    });

    await this.redis.invalidate('relationships');
    await this.redis.invalidatePrefix(relation.userId);
    await this.redis.invalidatePrefix(relation?.userReceptorId ?? '');
  }

  async validateMany(relationId: number[]) {
    const relation = await prisma.relationShip.findMany({
      where: { id: { in: relationId } },
    });

    if (!relation) throw new AppError('Relacionamento não encontrado');

    if (relation.length > 0) throw new AppError('Relacionamentos já aprovados');

    await prisma.relationShip.updateMany({
      where: { id: { in: relationId } },
      data: { status: 1 },
    });

    await this.redis.removeAll();
  }

  async podiun(userId: string) {
    const users = await this.user.listAll();
    const relationships = await this.all();

    const types = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const position: { [key: string]: any } = {};
    const aprovaded: { [key: string]: TRelationships[] } = {};
    const notAprovaded: { [key: string]: TRelationships[] } = {};
    let totalPontos = 0;

    const Position = [];

    types.forEach(t => {
      const item: I[] = [];

      users.forEach(user => {
        const metrica = {
          qnt: 0,
          pontos: 0,
          type: t,
          nome: user.nome,
          userId: user.id,
          type_str: _convertionType[t] ?? 'Desconhecido',
        };

        const itensAproveded = relationships.filter(r => {
          if (
            r.status === 1 &&
            r.userId === user.id &&
            r.type !== 6 &&
            r.type === t
          ) {
            return r;
          }
        });

        if (t === 6) {
          let pt = 0;
          const donates = relationships.filter(
            h => h.type === 6 && h.userId === user.id && h.status === 1,
          );

          donates.forEach(h => {
            const donate = h.objeto.donate as TDonate[];
            if (donate && donate.length > 0) {
              const calc = donate.reduce((ac, i) => ac + i.ponto, 0);
              pt += calc;
            }
          });
          metrica.pontos += pt;
        }

        metrica.qnt += itensAproveded.length;
        metrica.pontos += itensAproveded.length * _pontos[t];

        item.push(metrica);
      });

      const rl = item
        .sort((a, b) => b.pontos - a.pontos)
        .map((h, i) => {
          return {
            pontos: h.pontos,
            userId: h.userId,
            nome: h.nome,
            rank: i + 1,
            qnt: h.qnt,
            type_str: h?.type_str,
          };
        })
        .find(h => h.userId === userId);

      const aprov = relationships.filter(
        h => h.userId === userId && h.status === 1 && h.type === t,
      );
      const notAprov = relationships.filter(
        h => h.userId === userId && h.status === 0 && h.type === t,
      );

      position[_convertionType[t]] = rl;

      Position.push(rl);
      aprovaded[_convertionType[t]] = aprov;
      notAprovaded[_convertionType[t]] = notAprov;

      totalPontos += rl?.pontos;
    });

    const currncyYear = await prisma.anoCorrente.findFirst();

    const globalCurrency = relationships
      .filter(h => h.type === 1 && h.status === 1)
      .reduce((ac, h) => ac + h.valor, currncyYear?.price);

    const currencyVenda =
      aprovaded.VENDA.reduce((ac, item) => ac + item.valor, 0) ?? 0;

    const validations = {
      position: Position,
      aprovaded,
      notAprovaded,
      totalPontos,
      currencyVenda,
      globalCurrency,
    };

    return validations;
  }

  async notValides(type: number) {
    const relatons = await prisma.relationShip.findMany({
      where: { type, status: 0 },
      orderBy: { status: 'asc' },
    });

    return relatons;
  }

  async deleteRealation(id: number) {
    const relation = await prisma.relationShip.findFirst({ where: { id } });

    if (!relation) throw new AppError('Relacionamento não encontrado');

    await prisma.relationShip.delete({ where: { id } });

    await this.redis.invalidate('relationships');
    await this.redis.invalidatePrefix(relation.userId);
    await this.redis.invalidatePrefix(relation?.userReceptorId ?? '');
  }

  async metricasUser(userId: string) {
    const relation = await prisma.relationShip.findMany({
      where: {
        userId,
        status: 1,
        type: { in: [1, 3] },
      },
    });

    const mensalidades = await prisma.relationShip.findMany({
      where: {
        userReceptorId: '54be7274-835a-42f5-aa24-ba2c27560f7a',
        status: 1,
        type: 1,
      },
    });

    const presencas = await prisma.relationShip.findMany({
      where: {
        userReceptorId: '54be7274-835a-42f5-aa24-ba2c27560f7a',
        status: 1,
        type: 3,
      },
    });

    const totalNegocios = relation.length;
    const valorEmVenda = relation.reduce((ac, h) => ac + h.valor, 0);
    const totalMensalidades = mensalidades.reduce((ac, h) => ac + h.valor, 0);
    const percent = valorEmVenda / totalMensalidades;

    const countThursdaysUntilToday = (startDate: Date): number => {
      const today = new Date();

      const weeks = eachDayOfInterval({ start: startDate, end: today });
      return weeks.filter(date => isThursday(date)).length;
    };
    const startDate = new Date(2025, 0, 1); // 1º de janeiro de 2024
    const week = countThursdaysUntilToday(startDate);

    return {
      negocios: {
        totalNegocios,
        currency: _toCurrency(valorEmVenda),
        value: valorEmVenda,
      },
      conpensacao: {
        totalMensalidades,
        currency: _toCurrency(totalMensalidades),
        value: totalMensalidades,
        conpensacao: _toPorcent(percent),
      },
      presenca: {
        totalPresenca: presencas.length,
        totalEncontros: week,
      },
    };
  }
}
