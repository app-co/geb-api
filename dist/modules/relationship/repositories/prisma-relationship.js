"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrismaRelationship = void 0;

var _prisma = require("../../../utils/prisma");

class PrismaRelationship {
  async create(data) {
    const create = await _prisma.prisma.relationShip.create({
      data
    });
    return create;
  }

  async delete(id) {
    await _prisma.prisma.relationShip.delete({
      where: {
        id
      }
    });
  }

  async update(data) {
    const up = await _prisma.prisma.relationShip.update({
      where: {
        id: data.id
      },
      data
    });
    return up;
  }

  async listAll() {
    const lis = await _prisma.prisma.relationShip.findMany();
    return lis;
  }

  async listByMembro(membro) {
    const fin = await _prisma.prisma.relationShip.findMany({
      where: {
        membro_id: membro
      }
    });
    return fin;
  }

  async listByUserId(fk_user_id) {
    const fin = await _prisma.prisma.relationShip.findMany({
      where: {
        fk_user_id
      }
    });
    return fin;
  }

  async findById(id) {
    const find = await _prisma.prisma.relationShip.findFirst({
      where: {
        id
      }
    });
    return find;
  }

}

exports.PrismaRelationship = PrismaRelationship;