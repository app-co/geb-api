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

  async create(data) {
    const consumo = await this.prisma.consumo.create({
      data: {
        presstador_id: data.prestador_id,
        consumidor_id: data.consumidor_id,
        type: data.type,
        valor: data.valor,
        descricao: data.descricao
      }
    });
    return consumo;
  }

  async listByConsumo(user_id) {
    const consumo = await this.prisma.consumo.findMany({
      where: {
        consumidor_id: user_id
      }
    });
    return consumo;
  }

  async listAll() {
    const find = await this.prisma.consumo.findMany();
    return find;
  }

}

exports.ConsumoRepository = ConsumoRepository;