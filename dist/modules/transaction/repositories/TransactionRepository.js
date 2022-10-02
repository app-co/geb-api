"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionRepository = void 0;

var _client = require("@prisma/client");

/* eslint-disable import/no-extraneous-dependencies */
class TransactionRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(data) {
    const create = await this.prisma.transaction.create({
      data: {
        consumidor_id: data.consumidor_id,
        consumidor_name: data.consumidor_name,
        prestador_id: data.prestador_id,
        prestador_name: data.prestador_name,
        descricao: data.descricao,
        valor: data.valor
      }
    });
    return create;
  }

  async findTransactionById(id) {
    const find = await this.prisma.transaction.findUnique({
      where: {
        id
      }
    });
    return find;
  }

  async findByConsumidor(id) {
    const find = await this.prisma.transaction.findMany({
      where: {
        consumidor_id: id
      }
    });
    return find;
  }

  async findByPrestador(id) {
    const find = await this.prisma.transaction.findMany({
      where: {
        prestador_id: id
      }
    });
    return find;
  }

  async listAllTransaction() {
    const list = await this.prisma.transaction.findMany();
    return list;
  }

  async delete(id) {
    await this.prisma.transaction.delete({
      where: {
        id
      }
    });
  }

}

exports.TransactionRepository = TransactionRepository;