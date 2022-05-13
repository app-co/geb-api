"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsumoController = void 0;

var _CreateConsumoConsumidor = require("../../services/CreateConsumoConsumidor");

var _ListValorPrestadorConsumoService = require("../../services/ListValorPrestadorConsumoService");

var _tsyringe = require("tsyringe");

var _CreateConsumoPrestadorService = require("../../services/CreateConsumoPrestadorService.service");

var _ListConsumoService = require("../../services/ListConsumoService.service");

var _ListValorConsumoService = require("../../services/ListValorConsumoService");

class ConsumoController {
  async createPrestador(req, res) {
    const service = _tsyringe.container.resolve(_CreateConsumoPrestadorService.CreateConsumoPrestadorService);

    const {
      descricao,
      type,
      valor
    } = req.body;
    const prestador_id = req.user.id;
    const consumo = await service.execute({
      prestador_id,
      descricao,
      type,
      valor
    });
    return res.json(consumo);
  }

  async createConsumidor(req, res) {
    const service = _tsyringe.container.resolve(_CreateConsumoConsumidor.CreateConsumoConsumidorService);

    const {
      consumidor_id,
      descricao,
      type,
      valor
    } = req.body;
    const consumo = await service.execute({
      consumidor_id,
      descricao,
      type,
      valor
    });
    return res.json(consumo);
  }

  async listAll(req, res) {
    const service = _tsyringe.container.resolve(_ListConsumoService.ListConsumoService);

    const consumo = await service.execute();
    return res.json(consumo);
  }

  async listValorP(req, res) {
    const service = _tsyringe.container.resolve(_ListValorPrestadorConsumoService.ListValorPrestadorConsumoService);

    const consumo = await service.execute();
    return res.json(consumo);
  }

  async listValorC(req, res) {
    const service = _tsyringe.container.resolve(_ListValorConsumoService.ListValorConsumoService);

    const consumo = await service.execute();
    return res.json(consumo);
  }

}

exports.ConsumoController = ConsumoController;