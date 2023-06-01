"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConvidadoPrisma = void 0;

var _client = require("@prisma/client");

class ConvidadoPrisma {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(data) {
    const create = await this.prisma.convidado.create({
      data: {
        fk_user_id: data.fk_user_id,
        name_convidado: data.name_convidado
      }
    });
    return create;
  }

  async listAll() {
    const find = await this.prisma.convidado.findMany({
      include: {
        user: true
      }
    });
    return find;
  }

  async update(id, approved) {
    const up = await this.prisma.convidado.update({
      where: {
        id
      },
      data: {
        approved
      }
    });
    return up;
  }

}

exports.ConvidadoPrisma = ConvidadoPrisma;