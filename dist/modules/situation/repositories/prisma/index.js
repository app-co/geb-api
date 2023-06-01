"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SituationPrisma = void 0;

var _client = require("@prisma/client");

class SituationPrisma {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async update(data) {
    const create = await this.prisma.situationUser.update({
      where: {
        fk_id_user: data.fk_id_user
      },
      data: {
        apadrinhado: data.apadrinhado,
        firstLogin: data.firstLogin,
        inativo: data.inativo,
        logado: data.logado
      }
    });
    return create;
  }

}

exports.SituationPrisma = SituationPrisma;