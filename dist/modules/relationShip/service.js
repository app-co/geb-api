"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RelationshipService = void 0;
var _lib = require("../../lib");
var _AppError = require("../../shared/app-error/AppError");
var _convertions = require("../../shared/utils/convertions");
class RelationshipService {
  constructor(redis, user) {
    this.redis = redis;
    this.user = user;
  }
  async register(obj) {
    const user = await this.user.getUserById(obj.userId);
    console.log(obj);
    if (!user) throw new _AppError.AppError('Usuário não encontrado');
    if (obj.type === 8) {
      const userReceptor = await _lib.prisma.user.findUnique({
        where: {
          id: obj.userReceptorId
        }
      });
      const reletion = await _lib.prisma.relationShip.create({
        data: {
          ...obj,
          status: 1,
          avatar: user?.profile?.avatar ?? "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg"
        }
      });
      if (userReceptor) {
        await _lib.prisma.user.update({
          where: {
            id: userReceptor.id
          },
          data: {
            apadrinhado: true
          }
        });
      }
    }
    const reletion = await _lib.prisma.relationShip.create({
      data: {
        ...obj,
        avatar: user?.profile?.avatar ?? "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg"
      }
    });
    await this.redis.invalidate('relationships');
    await this.redis.invalidatePrefix(obj.userId);
    return reletion;
  }
  async all() {
    let relations = await this.redis.recover('relationships');
    if (!relations) {
      relations = await _lib.prisma.relationShip.findMany({
        orderBy: {
          type: 'asc'
        }
      });
      await this.redis.save('relationships', relations);
    }
    const rl = relations.map(h => {
      return {
        ...h,
        type_str: _convertions._convertionType[h.type] ?? "Desconhecido"
      };
    });
    return rl;
  }
  async byUser(userId) {
    let relations = await this.redis.recover(`${userId}:relationships`);
    if (!relations) {
      relations = await _lib.prisma.relationShip.findMany({
        where: {
          userId
        },
        orderBy: {
          type: 'asc'
        }
      });
    }
    const rl = relations.map(h => {
      return {
        ...h,
        type_str: _convertions._convertionType[h.type] ?? "Desconhecido"
      };
    });
    return rl;
  }
  async byReceptor(receptorId) {
    let relations = await this.redis.recover(`${receptorId}:relationships`);
    if (!relations) {
      relations = await _lib.prisma.relationShip.findMany({
        where: {
          userReceptorId: receptorId
        },
        orderBy: {
          type: 'asc'
        }
      });
    }
    const rl = relations.map(h => {
      return {
        ...h,
        type_str: _convertions._convertionType[h.type] ?? "Desconhecido"
      };
    });
    return rl;
  }
  async relationForAprovation(userId) {
    const relations = await _lib.prisma.relationShip.findMany({
      where: {
        userReceptorId: userId,
        status: 0
      }
    });
    return relations;
  }
  async validate(relationId) {
    const relation = await _lib.prisma.relationShip.findFirst({
      where: {
        id: relationId
      }
    });
    if (!relation) throw new _AppError.AppError('Relacionamento não encontrado');
    if (relation.status === 1) throw new _AppError.AppError('Relacionamento já aprovado');
    const userProvider = await this.user.getUserById(relation.userId);
    if (relation.type === 1) {
      await _lib.prisma.relationShip.create({
        data: {
          userId: relation.userReceptorId,
          type: 2,
          status: 1,
          avatar: userProvider?.profile?.avatar ?? "https://st.depositphotos.com/1537427/3571/v/450/depositphotos_35717211-stock-illustration-vector-user-icon.jpg",
          valor: relation.valor,
          hub: relation.hub,
          objeto: relation.objeto
        }
      });
    }
    await _lib.prisma.relationShip.update({
      where: {
        id: relationId
      },
      data: {
        status: 1
      }
    });
    await this.redis.invalidate('relationships');
    await this.redis.invalidatePrefix(relation.userId);
    await this.redis.invalidatePrefix(relation?.userReceptorId ?? '');
  }
  async validateMany(relationId) {
    const relation = await _lib.prisma.relationShip.findMany({
      where: {
        id: {
          in: relationId
        }
      }
    });
    if (!relation) throw new _AppError.AppError('Relacionamento não encontrado');
    if (relation.length > 0) throw new _AppError.AppError('Relacionamentos já aprovados');
    await _lib.prisma.relationShip.updateMany({
      where: {
        id: {
          in: relationId
        }
      },
      data: {
        status: 1
      }
    });
    await this.redis.removeAll();
  }
  async podiun(userId) {
    const users = await this.user.listAll();
    const relationships = await this.all();
    const types = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let position = {};
    let aprovaded = {};
    let notAprovaded = {};
    let totalPontos = 0;
    const Position = [];
    types.forEach(t => {
      let item = [];
      users.forEach(user => {
        let metrica = {
          qnt: 0,
          pontos: 0,
          type: t,
          nome: user.nome,
          userId: user.id,
          type_str: _convertions._convertionType[t] ?? "Desconhecido"
        };
        const itensAproveded = relationships.filter(r => {
          if (r.status === 1 && r.userId === user.id && r.type !== 6 && r.type === t) {
            return r;
          }
        });
        if (t === 6) {
          let pt = 0;
          const donates = relationships.filter(h => h.type === 6 && h.userId === user.id && h.status === 1);
          donates.forEach(h => {
            const donate = h.objeto.donate;
            if (donate && donate.length > 0) {
              const calc = donate.reduce((ac, i) => ac + i.ponto, 0);
              pt += calc;
            }
          });
          metrica.pontos += pt;
        }
        metrica.qnt += itensAproveded.length;
        metrica.pontos += itensAproveded.length * _convertions._pontos[t];
        item.push(metrica);
      });
      const rl = item.sort((a, b) => b.pontos - a.pontos).map((h, i) => {
        return {
          pontos: h.pontos,
          userId: h.userId,
          nome: h.nome,
          rank: i + 1,
          qnt: h.qnt,
          type_str: h?.type_str
        };
      }).find(h => h.userId === userId);
      const aprov = relationships.filter(h => h.userId === userId && h.status === 1 && h.type === t);
      const notAprov = relationships.filter(h => h.userId === userId && h.status === 0 && h.type === t);
      position[_convertions._convertionType[t]] = rl;
      Position.push(rl);
      aprovaded[_convertions._convertionType[t]] = aprov;
      notAprovaded[_convertions._convertionType[t]] = notAprov;
      totalPontos += rl?.pontos;
    });
    const currncyYear = await _lib.prisma.anoCorrente.findFirst();
    const globalCurrency = relationships.filter(h => h.type === 1 && h.status === 1).reduce((ac, h) => ac + h.valor, currncyYear?.price);
    const currencyVenda = aprovaded.VENDA.reduce((ac, item) => ac + item.valor, 0) ?? 0;
    const validations = {
      position: Position,
      aprovaded,
      notAprovaded,
      totalPontos,
      currencyVenda,
      globalCurrency
    };
    return validations;
  }
  async notValides(type) {
    const relatons = await _lib.prisma.relationShip.findMany({
      where: {
        type,
        status: 0
      },
      orderBy: {
        status: 'asc'
      }
    });
    return relatons;
  }
  async deleteRealation(id) {
    const relation = await _lib.prisma.relationShip.findFirst({
      where: {
        id
      }
    });
    if (!relation) throw new _AppError.AppError('Relacionamento não encontrado');
    await _lib.prisma.relationShip.delete({
      where: {
        id
      }
    });
    await this.redis.invalidate('relationships');
    await this.redis.invalidatePrefix(relation.userId);
    await this.redis.invalidatePrefix(relation?.userReceptorId ?? '');
  }
}
exports.RelationshipService = RelationshipService;