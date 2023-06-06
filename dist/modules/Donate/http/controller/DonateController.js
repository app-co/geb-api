"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DonateController = void 0;

var _donalte = require("../../services/donalte");

var _tsyringe = require("tsyringe");

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class DonateController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_donalte.donalte);

    const {
      itens
    } = req.body;
    const fk_id_user = req.user.id;
    const create = await service.create({
      itens,
      fk_id_user
    });
    return res.json(create);
  }

  async listMany(req, res) {
    const service = _tsyringe.container.resolve(_donalte.donalte);

    const list = await service.listMany();
    return res.json(list);
  }

  async findById(req, res) {
    const service = _tsyringe.container.resolve(_donalte.donalte);

    const id = req.params;
    const list = await service.findById(String(id));
    return res.json(list);
  }

  async delete(req, res) {
    const service = _tsyringe.container.resolve(_donalte.donalte);

    const {
      id
    } = req.params;
    const list = await service.delete({
      id: String(id)
    });
    return res.json(list);
  }

  async approved(req, res) {
    const service = _tsyringe.container.resolve(_donalte.donalte);

    const {
      id
    } = req.params;
    const list = await service.validate({
      id: String(id)
    });
    return res.json(list);
  }

}

exports.DonateController = DonateController;