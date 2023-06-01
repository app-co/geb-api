"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StarController = void 0;

var _createStar = require("../../services/createStar");

var _tsyringe = require("tsyringe");

class StarController {
  async create(req, res) {
    const serv = _tsyringe.container.resolve(_createStar.CreateStar);

    const {
      fk_id_user,
      star
    } = req.body;
    const valiador = req.user.id;
    const create = await serv.execute({
      fk_id_user,
      star,
      valiador
    });
    return res.json(create);
  }

  async list(req, res) {}

}

exports.StarController = StarController;