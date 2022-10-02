"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.B2bController = void 0;

var _CreateB2bService = require("../../services/CreateB2bService");

var _FindB2bBySendId = require("../../services/FindB2bBySendId");

var _ListAllB2b = require("../../services/ListAllB2b");

var _PontosB2b = require("../../services/PontosB2b");

var _ValiidateB2b = require("../../services/ValiidateB2b");

var _tsyringe = require("tsyringe");

var _DeleteB2b = require("../../services/DeleteB2b");

var _FindB2bByRecevid = require("../../services/FindB2bByRecevid");

class B2bController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_CreateB2bService.CreateB2b);

    const {
      recevid_id,
      assunto,
      appointment,
      send_id,
      send_name,
      recevid_name,
      validate
    } = req.body;
    const create = await service.execute({
      send_id,
      recevid_id,
      appointment,
      send_name,
      recevid_name,
      assunto,
      validate
    }); // req.io.emit('trans', create);

    return res.json(create);
  }

  async listAll(req, res) {
    const service = _tsyringe.container.resolve(_ListAllB2b.ListAllB2b);

    const create = await service.execute();
    return res.json(create);
  }

  async findBySend(req, res) {
    const service = _tsyringe.container.resolve(_FindB2bBySendId.FindB2bBySendId);

    const {
      id
    } = req.user;
    const create = await service.execute(id);
    return res.json(create);
  }

  async findByRecevid(req, res) {
    const service = _tsyringe.container.resolve(_FindB2bByRecevid.FindB2bByRecevid);

    const {
      id
    } = req.user;
    const create = await service.execute(id);
    return res.json(create);
  }

  async validate(req, res) {
    const service = _tsyringe.container.resolve(_ValiidateB2b.ValidateB2b);

    const {
      id
    } = req.body;
    const user_id = req.user.id;
    const create = await service.execute(id, user_id);
    return res.json(create);
  }

  async delete(req, res) {
    const service = _tsyringe.container.resolve(_DeleteB2b.DeleteB2b);

    const {
      id
    } = req.params;
    const create = await service.execute(id);
    return res.json(create);
  }

  async pontos(req, res) {
    const service = _tsyringe.container.resolve(_PontosB2b.PontosB2b);

    const create = await service.exec();
    return res.json(create);
  }

}

exports.B2bController = B2bController;