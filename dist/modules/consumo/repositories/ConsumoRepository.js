"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsumoRepository = void 0;

var _client = require(".prisma/client");

class ConsumoRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  //* * Orders */
  async create(data) {
    const consumo = await this.prisma.orderTransaction.create({
      data: {
        prestador_id: data.prestador_id,
        consumidor_id: data.consumidor_id,
        consumidor_name: data.consumidor_name,
        prestador_name: data.prestador_name,
        valor: data.valor,
        descricao: data.descricao
      }
    });
    return consumo;
  }

  async findOrderPrestador(user_id) {
    const consumo = await this.prisma.orderTransaction.findMany({
      where: {
        prestador_id: user_id
      }
    });
    return consumo;
  }

  async findAllOrder() {
    const list = await this.prisma.orderTransaction.findMany();
    return list;
  }

  async findOrderById(id) {
    const find = await this.prisma.orderTransaction.findUnique({
      where: {
        id
      }
    });
    return find;
  }

  async deleteOrder(id) {
    await this.prisma.orderTransaction.delete({
      where: {
        id
      }
    });
  }

  async listAll() {
    const find = await this.prisma.consumo.findMany();
    return find;
  }

  async findOrderConsumidor(consumidor_id) {
    const consumo = await this.prisma.orderTransaction.findMany({
      where: {
        consumidor_id
      }
    });
    return consumo;
  }

}

exports.ConsumoRepository = ConsumoRepository;