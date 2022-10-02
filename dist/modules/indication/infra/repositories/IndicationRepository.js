"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndicationRepository = void 0;

var _client = require(".prisma/client");

class IndicationRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(data) {
    const create = await this.prisma.indication.create({
      data: {
        indicado_id: data.indicado_id,
        indicado_name: data.indicado_name,
        quemIndicou_id: data.quemIndicou_id,
        quemIndicou_name: data.quemIndicou_name,
        client_name: data.client_name,
        phone_number_client: data.phone_number_client,
        description: data.description
      }
    });
    return create;
  }

  async findByIndicado(id) {
    const find = await this.prisma.indication.findMany({
      where: {
        indicado_id: id
      }
    });
    return find;
  }

  async findByQuemIndicou(id) {
    const find = await this.prisma.indication.findMany({
      where: {
        quemIndicou_id: id
      }
    });
    return find;
  }

  async findById(id) {
    const find = await this.prisma.indication.findUnique({
      where: {
        id
      }
    });
    return find;
  }

  async listAll() {
    const find = await this.prisma.indication.findMany();
    return find;
  }

  async delete(id) {
    const del = await this.prisma.indication.delete({
      where: {
        id
      }
    });
    return del;
  }

  async validate(id) {
    const up = await this.prisma.indication.update({
      where: {
        id
      },
      data: {
        validate: true
      }
    });
    return up;
  }

}

exports.IndicationRepository = IndicationRepository;