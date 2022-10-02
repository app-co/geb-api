"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndicationController = void 0;

var _tsyringe = require("tsyringe");

var _CreateIndicationService = require("../services/CreateIndicationService");

var _delteIndication = require("../services/delteIndication");

var _ListAllIndication = require("../services/ListAllIndication");

var _ListByIndicado = require("../services/ListByIndicado");

var _ListByWhoIndService = require("../services/ListByWhoIndService");

var _PontosIndication = require("../services/PontosIndication");

var _ValidateIndication = require("../services/ValidateIndication");

class IndicationController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_CreateIndicationService.CreateIndicationService);

    const {
      indicado_id,
      quemIndicou_name,
      indicado_name,
      quemIndicou_id,
      client_name,
      description,
      phone_number_client
    } = req.body;
    const create = await service.execute({
      indicado_id,
      client_name,
      description,
      phone_number_client,
      quemIndicou_id,
      indicado_name,
      quemIndicou_name
    });
    return res.json(create);
  }

  async validate(req, res) {
    const service = _tsyringe.container.resolve(_ValidateIndication.ValidateIndicationService);

    const {
      indication_id
    } = req.body;
    const indicado_id = req.user.id;
    const create = await service.execute({
      indication_id,
      indicado_id
    });
    return res.json(create);
  }

  async listAll(req, res) {
    const service = _tsyringe.container.resolve(_ListAllIndication.ListAllIndication);

    const list = await service.execute();
    return res.json(list);
  }

  async pontos(req, res) {
    const service = _tsyringe.container.resolve(_PontosIndication.PontosIndication);

    const list = await service.execute();
    return res.json(list);
  }

  async listIndicado(req, res) {
    const service = _tsyringe.container.resolve(_ListByIndicado.ListByIndicado);

    const {
      id
    } = req.user;
    const list = await service.execute(id);
    return res.json(list);
  }

  async quemInd(req, res) {
    const service = _tsyringe.container.resolve(_ListByWhoIndService.ListByWhoIndService);

    const {
      id
    } = req.user;
    const list = await service.execute(id);
    return res.json(list);
  }

  async del(req, res) {
    const service = _tsyringe.container.resolve(_delteIndication.DeleteIndicationService);

    const {
      id
    } = req.params;
    const list = await service.execute(id);
    return res.json(list);
  }

}

exports.IndicationController = IndicationController;