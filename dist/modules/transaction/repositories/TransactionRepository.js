"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionRepository = void 0;

var _client = require("@prisma/client");

class TransactionRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(data) {
    const create = await this.prisma.transaction.create({
      data: {
        consumidor_id: data.consumidor_id,
        prestador_id: data.prestador_id,
        descricao: data.descricao,
        valor: data.valor,
        nome: data.nome
      }
    });
    return create;
  }

  async findById(id) {
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

  async delete(id) {
    await this.prisma.transaction.delete({
      where: {
        id
      }
    });
  }

}

exports.TransactionRepository = TransactionRepository;