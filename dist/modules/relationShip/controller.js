"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = void 0;
var _make = require("./make");
var _validations = require("../../dto/validations");
const service = (0, _make.make)();
class Controller {
  async register(req, res) {
    const schema = _validations.validation.relationships.omit({
      avatar: true,
      id: true
    }).parse({
      ...req.body,
      userId: req.user.sub
    });
    const rs = await service.register(schema);
    return res.status(201).send(rs);
  }
  async all(req, res) {
    const rs = await service.all();
    return res.status(201).send(rs);
  }
  async byUser(req, res) {
    const userId = req.user.sub;
    const rs = await service.byUser(userId);
    return res.status(201).send(rs);
  }
  async byReceptor(req, res) {
    const receptorId = req.user.sub;
    const rs = await service.byReceptor(receptorId);
    return res.status(201).send(rs);
  }
  async relationForAprovation(req, res) {
    const userId = req.user.sub;
    const rs = await service.relationForAprovation(userId);
    return res.status(201).send(rs);
  }
  async validate(req, res) {
    const {
      id
    } = req.params;
    await service.validate(Number(id));
    return res.status(201).send('ok');
  }
  async podiun(req, res) {
    const userId = req.user.sub;
    const rs = await service.podiun(userId);
    return res.status(201).send(rs);
  }
  async notValides(req, res) {
    const {
      type
    } = req.params;
    const rs = await service.notValides(Number(type));
    return res.status(201).send(rs);
  }
  async delete(req, res) {
    const {
      id
    } = req.params;
    await service.deleteRealation(Number(id));
    return res.status(201).send('ok');
  }
}
exports.Controller = Controller;