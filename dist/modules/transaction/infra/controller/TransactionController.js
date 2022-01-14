"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionControler = void 0;

var _tsyringe = require("tsyringe");

var _CreateTransactionService = require("../../service/CreateTransactionService");

var _DeleteTransactionService = require("../../service/DeleteTransactionService");

var _LIstTransactionService = require("../../service/LIstTransactionService");

class TransactionControler {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_CreateTransactionService.CreateTransactionService);

    const {
      prestador_id,
      consumidor_id,
      valor,
      descricao,
      nome
    } = req.body;
    const create = await service.execute({
      prestador_id,
      consumidor_id,
      valor,
      descricao,
      nome
    });
    req.io.emit('trans', create);
    return res.json(create);
  }

  async find(req, res) {
    const service = _tsyringe.container.resolve(_LIstTransactionService.ListTransactionService);

    const {
      id
    } = req.user;
    const find = await service.execute({
      id
    });
    return res.json(find);
  }

  async del(req, res) {
    const service = _tsyringe.container.resolve(_DeleteTransactionService.DeleteTransactionService);

    const {
      id
    } = req.params;
    const find = await service.execute(String(id));
    return res.json(find);
  }

}

exports.TransactionControler = TransactionControler;