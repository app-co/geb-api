"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinksController = void 0;

var _createLinks = require("../../services/createLinks");

var _tsyringe = require("tsyringe");

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class LinksController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_createLinks.createLinks);

    const {
      nome,
      link
    } = req.body;
    const {
      id
    } = req.user;
    const create = await service.create({
      nome,
      link,
      fk_user_id: id
    });
    return res.json(create);
  }

  async listMany(req, res) {
    const service = _tsyringe.container.resolve(_createLinks.createLinks);

    const user_id = req.user.id;
    const list = await service.listMany(user_id);
    return res.json(list);
  }

}

exports.LinksController = LinksController;