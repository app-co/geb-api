"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRespository = void 0;

var _client = require("@prisma/client");

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class UsersRespository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create(data) {
    const user = await this.prisma.user.create({
      data: {
        nome: data.nome,
        membro: data.membro,
        adm: data.adm,
        CNPJ: data.CNPJ,
        senha: data.senha,
        whats: data.whats,
        CPF: data.CPF,
        ramo: data.ramo,
        enquadramento: data.enquadramento,
        email: data.email,
        workName: data.workName
      }
    });
    return user;
  }

  async findByMembro(membro) {
    const find = await this.prisma.user.findUnique({
      where: {
        membro
      }
    });
    return find;
  }

  async findById(user_id) {
    const find = await this.prisma.user.findUnique({
      where: {
        id: user_id
      }
    });
    return find;
  }

  async findAll() {
    const find = await this.prisma.user.findMany({
      include: {
        presenca: true
      }
    });
    return find;
  }

  async update(data, id) {
    const up = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        nome: data.nome,
        membro: data.membro,
        adm: data.adm,
        CNPJ: data.CNPJ,
        whats: data.whats,
        CPF: data.CPF,
        ramo: data.ramo,
        enquadramento: data.enquadramento,
        email: data.email,
        workName: data.workName,
        links: data.links
      }
    });
    return up;
  }

  async updatePadrinho(user_id, padrinho) {
    const up = await this.prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        padrinhQuantity: padrinho
      }
    });
    return up;
  }

  async updateToken(id, token) {
    const up = await this.prisma.user.update({
      where: {
        id
      },
      data: {
        token
      }
    });
    return up;
  }

}

exports.UsersRespository = UsersRespository;