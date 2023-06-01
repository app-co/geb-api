"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinksPrismaRepository = void 0;

var _prisma = require("../../../../utils/prisma");

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class LinksPrismaRepository {
  async create(data) {
    const create = await _prisma.prisma.midia.create({
      data: {
        nome: data.nome,
        link: data.link,
        fk_user_id: data.fk_user_id
      }
    });
    return create;
  }

  async findByName(name) {
    const list = await _prisma.prisma.midia.findFirst({
      where: {
        nome: name
      }
    });
    return list;
  }

  async listByUser(fk_user_id) {
    const list = await _prisma.prisma.midia.findMany({
      where: {
        fk_user_id
      }
    });
    return list;
  }

}

exports.LinksPrismaRepository = LinksPrismaRepository;