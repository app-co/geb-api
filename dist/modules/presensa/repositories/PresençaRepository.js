"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresencaRepository = void 0;

var _client = require(".prisma/client");

/* eslint-disable import/no-extraneous-dependencies */
class PresencaRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(data) {
    const create = await this.prisma.presenca.create({
      data: {
        user_id: data.user_id,
        nome: data.nome,
        presenca: data.presenca
      }
    });
    return create;
  }

  async create_order(data) {
    const create = await this.prisma.orderPresenca.create({
      data: {
        nome: data.nome,
        user_id: data.user_id
      }
    });
    return create;
  }

  async listOrderWithId(id) {
    const list = await this.prisma.orderPresenca.findFirst({
      where: {
        id
      }
    });
    return list;
  }

  async listOrderWithUserId(user_id) {
    const list = await this.prisma.orderPresenca.findFirst({
      where: {
        user_id
      }
    });
    return list;
  }

  async listAllOrder() {
    const list = await this.prisma.orderPresenca.findMany();
    return list;
  }

  async listAllPresenseWithUserId(user_id) {
    const list = await this.prisma.presenca.findMany({
      where: {
        user_id
      }
    });
    return list;
  }

  async deleteOrderPresenca(id) {
    const del = await this.prisma.orderPresenca.delete({
      where: {
        id
      }
    });
    return del;
  }

  async listAllPresenca() {
    const list = await this.prisma.presenca.findMany();
    return list;
  } // async update(id: string, presenca: boolean): Promise<Presenca> {
  //    const up = await this.prisma.presenca.update({
  //       where: { id },
  //       data: {
  //          presenca,
  //       },
  //    });
  //    return up;
  // }
  // async list(user_id: string): Promise<Presenca[]> {
  //    const criate = await this.prisma.presenca.findMany({
  //       where: { user_id },
  //       include: { user: true },
  //    });
  //    return criate;
  // }
  // async listAll(): Promise<Presenca[]> {
  //    const criate = await this.prisma.presenca.findMany({
  //       include: { user: true },
  //    });
  //    return criate;
  // }


}

exports.PresencaRepository = PresencaRepository;