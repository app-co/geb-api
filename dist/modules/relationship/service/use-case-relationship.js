"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseCasesRelationship = void 0;

var _client = require("@prisma/client");

var _AppError = require("../../../shared/errors/AppError");

var _pontos = require("../../../utils/pontos");

class UseCasesRelationship {
  constructor(repoRelation, repoUser, repoB2b, repoInd, repoDonate, repoOrder, repeConsumo, repoInvit, repoPresenca) {
    this.repoRelation = repoRelation;
    this.repoUser = repoUser;
    this.repoB2b = repoB2b;
    this.repoInd = repoInd;
    this.repoDonate = repoDonate;
    this.repoOrder = repoOrder;
    this.repeConsumo = repeConsumo;
    this.repoInvit = repoInvit;
    this.repoPresenca = repoPresenca;
  }

  async create(data) {
    const findMembro = await this.repoUser.findById(data.membro_id);

    if (!findMembro) {
      throw new _AppError.Err('Membro não encontrado');
    }

    if (data.fk_user_id === data.membro_id) {
      throw new _AppError.Err('Você não pode fazer negócios com você mesmo');
    }

    const create = await this.repoRelation.create(data);
    return create;
  }

  async delete(id) {
    await this.repoRelation.delete(id);
  }

  async update(data) {
    const findRelation = await this.repoRelation.findById(data.id);
    const membro = await this.repoUser.findById(data.membro_id);

    if (!membro) {
      throw new _AppError.Err('Membro não encontrado');
    }

    if (!findRelation) {
      throw new _AppError.Err('Relacionament não encontrado');
    }

    if (findRelation.membro_id !== data.membro_id) {
      throw new _AppError.Err('Você não pode validar esse relacionamento');
    }

    if (findRelation.situation) {
      throw new _AppError.Err('Relacionamento já validado');
    }

    const pt = findRelation.ponts;
    const dt = { ...data,
      ponts: pt + data.ponts
    };
    const up = await this.repoRelation.update(dt);
    return up;
  }

  async listAll() {
    const list = await this.repoRelation.listAll();
    return list;
  }

  async listByMembro(membro) {
    const list = await this.repoRelation.listByMembro(membro);
    const consumoIn = list.map(h => {
      return { ...h,
        type: 'CONSUMO_IN'
      };
    });
    return consumoIn;
  }

  async listByUserId(fk_user_id) {
    const list = await this.repoRelation.listByUserId(fk_user_id);
    return list;
  }

  async findById(id) {
    const find = await this.repoRelation.findById(id);
    return find;
  }

  async data() {
    const b2b = await this.repoB2b.listAllB2b();
    const ind = await this.repoInd.listAll();
    const donate = await this.repoDonate.listMany();
    const order = await this.repoOrder.findAllOrder();
    const consumo = await this.repeConsumo.listAllTransaction();
    const invit = await this.repoInvit.listAll();
    const presencaO = await this.repoPresenca.listAllOrder();
    const presenca = await this.repoPresenca.listAllPresenca();
    b2b.forEach(async h => {
      const objto = {
        description: h.assunto,
        send_name: h.send_name
      };
      const dt = {
        objto,
        created_at: new Date(h.createdAt),
        updated_at: new Date(h.updated_at),
        situation: h.validate,
        type: 'B2B',
        ponts: 20,
        fk_user_id: h.send_id,
        membro_id: h.recevid_id
      };
      console.log(dt);
      await this.repoRelation.create(dt);
      console.log(dt);
    });
    ind.forEach(async h => {
      const objto = {
        quemIndicaou_name: h.quemIndicou_name,
        client_name: h.client_name,
        phone_number_client: h.phone_number_client,
        description: h.description
      };
      const dt = {
        objto,
        created_at: new Date(h.createdAt),
        updated_at: new Date(h.updated_at),
        situation: h.validate,
        type: _client.RelationType.INDICATION,
        ponts: _pontos.pontos.indicacao,
        fk_user_id: h.quemIndicou_id,
        membro_id: h.indicado_id
      };
      console.log(dt);
      await this.repoRelation.create(dt);
    });
    donate.forEach(async h => {
      const objto = {
        itens: 'arroz, feijao, batata, oleo'
      };
      const dt = {
        objto,
        created_at: new Date(h.created_at),
        updated_at: new Date(h.updated_at),
        situation: h.approved,
        type: _client.RelationType.DONATE,
        ponts: 50,
        fk_user_id: h.fk_id_user
      };
      console.log(dt);
      await this.repoRelation.create(dt);
    });
    order.forEach(async h => {
      const objto = {
        consumidor_name: 'teste',
        valor: h.valor,
        descricao: h.descricao
      };
      const dt = {
        objto,
        created_at: new Date(h.created_at),
        situation: false,
        type: _client.RelationType.CONSUMO_OUT,
        ponts: _pontos.pontos.consumo,
        fk_user_id: h.consumidor_id,
        membro_id: h.prestador_id
      };
      console.log(dt);
      await this.repoRelation.create(dt);
    });
    consumo.forEach(async h => {
      const objto = {
        client_name: h?.consumidor_name ? h.consumidor_name : '',
        valor: h.valor,
        descricao: h.descricao
      };
      const dt = {
        objto,
        created_at: new Date(h.created_at),
        updated_at: new Date(h.updated_at),
        situation: true,
        type: _client.RelationType.CONSUMO_OUT,
        ponts: _pontos.pontos.consumo,
        client_id: h?.consumidor_id ? h?.consumidor_id : '',
        prestador_id: h.prestador_id,
        fk_user_id: h?.consumidor_id ? h?.consumidor_id : h.prestador_id
      };
      console.log(dt);
      await this.repoRelation.create(dt);
    });
    invit.forEach(async h => {
      console.log(h);
      const objto = {
        name_convidado: h.name_convidado
      };
      const dt = {
        objto,
        created_at: new Date(h.created_at),
        updated_at: new Date(h.updated_at),
        situation: h.approved,
        type: _client.RelationType.INDICATION,
        ponts: 20,
        fk_user_id: h.fk_user_id
      };
      await this.repoRelation.create(dt);
    });
    presencaO.forEach(async h => {
      const objto = {
        nome: h.nome
      };
      const dt = {
        objto,
        created_at: new Date(h.createdAt),
        situation: false,
        type: _client.RelationType.PRESENCA,
        ponts: _pontos.pontos.presenca,
        fk_user_id: h.user_id
      };
      console.log(dt);
      await this.repoRelation.create(dt);
    });
    presenca.forEach(async h => {
      const objto = {
        nome: h.nome
      };
      const dt = {
        objto,
        created_at: new Date(h.createdAt),
        situation: true,
        type: _client.RelationType.PRESENCA,
        ponts: _pontos.pontos.presenca,
        fk_user_id: h.user_id
      };
      console.log(dt);
      await this.repoRelation.create(dt);
    });
  }

}

exports.UseCasesRelationship = UseCasesRelationship;