"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConvidadoController = void 0;

var _createConvidadoService = require("../../services/createConvidadoService");

var _ListAllConvidadoService = require("../../services/ListAllConvidadoService");

var _updateConvidadoService = require("../../services/updateConvidadoService");

var _tsyringe = require("tsyringe");

class ConvidadoController {
  async create(req, res) {
    const serv = _tsyringe.container.resolve(_createConvidadoService.CreateConvidadoService);

    const fk_user_id = req.user.id;
    const {
      name_convidado
    } = req.body;
    const create = await serv.execute({
      fk_user_id,
      name_convidado
    });
    return res.json(create);
  }

  async listAll(req, res) {
    const serv = _tsyringe.container.resolve(_ListAllConvidadoService.ListAllConvidadoService);

    const list = await serv.exec();
    return res.json(list);
  }

  async update(req, res) {
    const serv = _tsyringe.container.resolve(_updateConvidadoService.UpdateConvidadoService);

    const {
      id,
      approved
    } = req.body;
    const list = await serv.exec(id, approved);
    return res.json(list);
  }

}

exports.ConvidadoController = ConvidadoController;