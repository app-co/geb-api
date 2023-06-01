"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SituationController = void 0;

var _updateSituation = require("../../services/updateSituation");

var _tsyringe = require("tsyringe");

class SituationController {
  async update(req, res) {
    const serv = _tsyringe.container.resolve(_updateSituation.UpdateSituationService);

    const {
      apadrinhado,
      firstLogin,
      fk_id_user,
      inativo,
      logado
    } = req.body;
    const create = await serv.execute({
      apadrinhado,
      firstLogin,
      fk_id_user,
      inativo,
      logado
    });
    return res.json(create);
  }

}

exports.SituationController = SituationController;