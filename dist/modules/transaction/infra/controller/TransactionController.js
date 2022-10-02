"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionControler = void 0;

var _FindTransactionById = require("../../service/FindTransactionById");

var _ListAllTransaction = require("../../service/ListAllTransaction");

var _ListByPrestador = require("../../service/ListByPrestador");

var _LitByConsumidor = require("../../service/LitByConsumidor");

var _PontosTransaction = require("../../service/PontosTransaction");

var _tsyringe = require("tsyringe");

var _DeleteTransactionService = require("../../service/DeleteTransactionService");

var _ValidateOrderTransactionService = require("../../service/ValidateOrderTransactionService");

class TransactionControler {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_ValidateOrderTransactionService.ValidateOrderTransactionService);

    const {
      consumidor_id,
      consumidor_name,
      prestador_name,
      prestador_id,
      valor,
      descricao,
      order_id
    } = req.body;
    const user_id = req.user.id;
    const create = await service.execute({
      consumidor_id,
      consumidor_name,
      prestador_name,
      prestador_id,
      valor,
      descricao,
      user_id,
      order_id
    }); // req.io.emit('trans', create);

    return res.json(create);
  }

  async findById(req, res) {
    const service = _tsyringe.container.resolve(_FindTransactionById.FindTransactionById);

    const {
      id
    } = req.params;
    const find = await service.execute({
      id
    });
    return res.json(find);
  }

  async listAll(req, res) {
    const service = _tsyringe.container.resolve(_ListAllTransaction.ListAllTransaction);

    const find = await service.execute();
    return res.json(find);
  }

  async findByPrestador(req, res) {
    const service = _tsyringe.container.resolve(_ListByPrestador.ListByPrestador);

    const {
      id
    } = req.user;
    const find = await service.execute({
      id
    });
    return res.json(find);
  }

  async findByConsumidor(req, res) {
    const service = _tsyringe.container.resolve(_LitByConsumidor.ListByConsumidor);

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
    const find = await service.execute({
      id: String(id)
    });
    return res.json(find);
  }

  async pontos(req, res) {
    const service = _tsyringe.container.resolve(_PontosTransaction.PontosTransaction);

    const find = await service.exec();
    return res.json(find);
  }

}

exports.TransactionControler = TransactionControler;