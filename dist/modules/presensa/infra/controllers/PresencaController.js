"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresensaController = void 0;

var _ClassificationPresensa = require("../../../*/presensa/services/ClassificationPresensa");

var _CreatePresensaService = require("../../../*/presensa/services/CreatePresensaService");

var _ListAllPresensaService = require("../../../*/presensa/services/ListAllPresensaService");

var _UdatePresensaService = require("../../../*/presensa/services/UdatePresensaService");

var _tsyringe = require("tsyringe");

var _ListPresensaService = require("../../services/ListPresensaService");

class PresensaController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_CreatePresensaService.CreatePresencaService);

    const {
      user_id
    } = req.body;
    const create = await service.execute({
      user_id
    });
    return res.json(create);
  }

  async update(req, res) {
    const service = _tsyringe.container.resolve(_UdatePresensaService.UpdatePresensaService);

    const {
      id,
      presenca
    } = req.body;
    const create = await service.execute({
      id,
      presenca
    });
    return res.json(create);
  }

  async list(req, res) {
    const service = _tsyringe.container.resolve(_ListPresensaService.ListPresensaService);

    const user_id = req.user.id;
    const list = await service.execute(user_id);
    return res.json(list);
  }

  async listAll(req, res) {
    const service = _tsyringe.container.resolve(_ListAllPresensaService.ListAllPresensaService);

    const list = await service.execute();
    return res.json(list);
  }

  async rank(req, res) {
    const service = _tsyringe.container.resolve(_ClassificationPresensa.ClassificationPresensa);

    const list = await service.execute();
    return res.json(list);
  }

}

exports.PresensaController = PresensaController;