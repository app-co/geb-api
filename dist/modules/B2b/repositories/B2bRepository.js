"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.B2bRepository = void 0;

var _client = require(".prisma/client");

/* eslint-disable import/no-extraneous-dependencies */
class B2bRepository {
  constructor() {
    this.prisma = new _client.PrismaClient();
  }

  async create({
    recevid_id,
    appointment,
    recevid_name,
    send_id,
    send_name,
    assunto,
    validate
  }) {
    const create = this.prisma.b2b.create({
      data: {
        recevid_id,
        recevid_name,
        send_name,
        send_id,
        appointment,
        assunto,
        validate
      }
    });
    return create;
  }

  async listAllB2b() {
    const list = await this.prisma.b2b.findMany();
    return list;
  }

  async findById(id) {
    const find = await this.prisma.b2b.findFirst({
      where: {
        id
      }
    });
    return find;
  }

  async validate(id) {
    const vali = await this.prisma.b2b.update({
      where: {
        id
      },
      data: {
        validate: true
      }
    });
    return vali;
  }

  async findB2bBySendId(send_id) {
    const find = await this.prisma.b2b.findMany({
      where: {
        send_id
      }
    });
    return find;
  }

  async findB2bByRecevidId(recevid_id) {
    const find = await this.prisma.b2b.findMany({
      where: {
        recevid_id
      }
    });
    return find;
  }

  async deleteB2bById(id) {
    const del = await this.prisma.b2b.delete({
      where: {
        id
      }
    });
    return del;
  }

}

exports.B2bRepository = B2bRepository;