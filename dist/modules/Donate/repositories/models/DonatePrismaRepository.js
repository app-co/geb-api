"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DonatePrismaRepository = void 0;

var _prisma = require("../../../../utils/prisma");

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class DonatePrismaRepository {
  async validate(id) {
    const up = await _prisma.prisma.donate.update({
      where: {
        id
      },
      data: {
        approved: true
      }
    });
    return up;
  }

  async delete(id) {
    await _prisma.prisma.donate.delete({
      where: {
        id
      }
    });
  }

  async create(data) {
    const create = await _prisma.prisma.donate.create({
      data
    });
    return create;
  }

  async findById(id) {
    const list = await _prisma.prisma.donate.findUnique({
      where: {
        id
      }
    });
    return list;
  }

  async listMany() {
    const list = await _prisma.prisma.donate.findMany();
    return list;
  }

}

exports.DonatePrismaRepository = DonatePrismaRepository;