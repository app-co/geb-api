"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StarPrisma = void 0;

var _client = require("@prisma/client");

class StarPrisma {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(data) {
    const create = await this.prisma.stars.create({
      data: {
        star: data.star,
        valiador: data.valiador,
        fk_id_user: data.fk_id_user
      }
    });
    return create;
  }

  async listByUser_id(id) {
    const find = await this.prisma.stars.findMany({
      where: {
        fk_id_user: id
      }
    });
    return find;
  }

}

exports.StarPrisma = StarPrisma;