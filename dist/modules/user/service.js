"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserService = void 0;
var _lib = require("../../lib");
var _AppError = require("../../shared/app-error/AppError");
var _bcryptjs = require("bcryptjs");
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UserService {
  constructor(redis) {
    this.redis = redis;
  }
  async create(obj) {
    const user = await _lib.prisma.user.findUnique({
      where: {
        apelido: obj.apelido
      }
    });
    if (user) throw new _AppError.AppError('Usuário já cadastrado');
    const senha = await (0, _bcryptjs.hash)(obj.senha, 6);
    const data = await _lib.prisma.user.create({
      data: {
        ...obj,
        senha
      }
    });
    const us = await this.getUserById(data.id);
    await this.redis.save(`${data.id}:user`, us);
    await this.redis.invalidate('users');
    return us;
  }
  async getUserById(userId) {
    let user = await this.redis.recover(`${userId}:user`);
    if (!user) {
      user = await _lib.prisma.user.findUnique({
        where: {
          id: userId
        },
        include: {
          profile: true
        }
      });
      await this.redis.save(`${userId}:user`, user);
    }
    return user;
  }
  async userByHub({
    hub,
    nome,
    pageNumber,
    pageSize,
    userId
  }) {
    if (nome && nome.length < 4) return;
    console.log(pageNumber);
    const totalUsers = await _lib.prisma.user.count();
    const users = await _lib.prisma.user.findMany({
      where: {
        hub: {
          hasEvery: hub
        },
        AND: {
          nome: {
            contains: nome,
            mode: 'insensitive'
          }
        },
        NOT: {
          id: userId
        }
      },
      include: {
        profile: true,
        Stars: true
      },
      orderBy: {
        nome: 'asc'
      },
      take: pageSize,
      skip: pageNumber
    });
    const us = users.map(h => {
      const lengthStar = h.Stars.length;
      if (lengthStar === 0) return {
        ...h,
        avalicaoes: 5
      };
      const soma = h.Stars.reduce((ac, item) => ac + item.star, 0);
      const avaliacoes = soma / lengthStar;
      return {
        ...h,
        avaliacoes
      };
    });
    const paginated = {
      totalPages: Math.round(totalUsers / pageSize),
      currentPage: Number(pageNumber) / Number(pageSize) + 1,
      totalRecords: totalUsers,
      pageSize,
      pageNumber,
      totalRecordsPerPage: totalUsers % Number(pageSize) === 0 ? Number(pageSize) : totalUsers % Number(pageSize),
      records: us
    };
    return paginated;
  }
  async listAll() {
    let users = await this.redis.recover('users');
    if (!users) {
      users = await _lib.prisma.user.findMany({
        orderBy: {
          nome: 'asc'
        }
      });
      await this.redis.save('users', users);
    }
    return users;
  }
  async registerProfile(obj) {
    const profile = await _lib.prisma.profile.findUnique({
      where: {
        userId: obj.userId
      }
    });
    if (!profile) {
      const data = await _lib.prisma.profile.create({
        data: {
          ...obj
        }
      });
      await this.redis.invalidate(`${obj.userId}:user`);
      return data;
    }
    const data = await _lib.prisma.profile.update({
      where: {
        userId: obj.userId
      },
      data: {
        ...obj
      }
    });
    await this.redis.invalidate(`${obj.userId}:user`);
    return data;
  }
  async updateUser(obj) {
    const user = await _lib.prisma.user.findUnique({
      where: {
        id: obj.id
      }
    });
    if (!user) throw new _AppError.AppError('Usuário não encontrado');
    let senha = null;
    if (obj.senha) {
      senha = await (0, _bcryptjs.hash)(obj.senha, 6);
    }
    const data = await _lib.prisma.user.update({
      where: {
        id: obj.id
      },
      data: {
        ...obj,
        senha
      }
    });
    await this.redis.invalidate(`${obj.id}:user`);
    await this.redis.invalidate('users');
    return data;
  }
  async updateProfile(obj) {
    const profile = await _lib.prisma.profile.findUnique({
      where: {
        userId: obj.userId
      }
    });
    if (!profile) throw new _AppError.AppError('Perfil não encontrado');
    const data = await _lib.prisma.profile.update({
      where: {
        userId: obj.userId
      },
      data: {
        ...obj
      }
    });
    await this.redis.invalidate(`${obj.userId}:user`);
    return data;
  }
  async deleteUser(userId) {
    const user = await _lib.prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) throw new _AppError.AppError('Usuário não encontrado');
    await _lib.prisma.user.delete({
      where: {
        id: userId
      }
    });
    await this.redis.invalidate(`${userId}:user`);
    await this.redis.invalidate('users');
    return 'Usuário excluído com sucesso';
  }
  async session(obj) {
    const user = await _lib.prisma.user.findUnique({
      where: {
        apelido: obj.apelido
      }
    });
    if (!user) throw new _AppError.AppError('Usuário não encontrado');
    const compareSenha = await (0, _bcryptjs.compare)(obj.senha, user.senha);
    if (!compareSenha) throw new _AppError.AppError('Senha inválida');
    return user;
  }
  async sincron() {
    const {
      data
    } = await _axios.default.get('http://192.168.0.66:3334/user/sincro');
    const relation = data.relation.filter(h => h);
    const r = await _lib.prisma.relationShip.createMany({
      data: relation
    });
    return r;
  }
  async star(userId, star) {
    await _lib.prisma.stars.create({
      data: {
        userId,
        star
      }
    });
    await this.redis.invalidatePrefix(`${userId}:user`);
    await this.redis.invalidate('users');
  }
}
exports.UserService = UserService;