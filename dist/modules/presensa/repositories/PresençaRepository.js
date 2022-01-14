"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresencaRepository = void 0;

var _client = require(".prisma/client");

class PresencaRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(data) {
    const create = await this.prisma.presenca.create({
      data: {
        user_id: data.user_id
      }
    });
    return create;
  }

  async update(id, presenca) {
    const up = await this.prisma.presenca.update({
      where: {
        id
      },
      data: {
        presenca
      }
    });
    return up;
  }

  async list(user_id) {
    const criate = await this.prisma.presenca.findMany({
      where: {
        user_id
      },
      include: {
        user: true
      }
    });
    return criate;
  }

  async listAll() {
    const criate = await this.prisma.presenca.findMany({
      include: {
        user: true
      }
    });
    return criate;
  }

}

exports.PresencaRepository = PresencaRepository;