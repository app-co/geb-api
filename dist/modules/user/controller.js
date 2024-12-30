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
    const schema = _validations.validation.user.omit({
      id: true
    }).parse(req.body);
    const rs = await service.create(schema);
    return res.status(201).send(rs);
  }
  async byId(req, res) {
    const userId = req.user.sub;
    const rs = await service.getUserById(userId);
    return res.status(201).send(rs);
  }
  async byHub(req, res) {
    const hub = _validations.validation.usersByHub.parse({
      ...req.query,
      userId: req.user.sub
    });
    const rs = await service.userByHub(hub);
    return res.status(201).send(rs);
  }
  async getAll(req, res) {
    const userId = req.user.sub;
    const rs = await service.listAll(userId);
    return res.status(201).send(rs);
  }
  async registerProfile(req, res) {
    const obj = _validations.validation.profile.omit({
      id: true
    }).parse(req.body);
    const rs = await service.registerProfile(obj);
    return res.status(201).send(rs);
  }
  async updateUser(req, res) {
    const obj = _validations.validation.user.parse(req.body);
    const rs = await service.updateUser(obj);
    return res.status(201).send(rs);
  }
  async updateProfile(req, res) {
    const obj = _validations.validation.profile.parse({
      ...req.body,
      userId: req.user.sub
    });
    const rs = await service.updateProfile(obj);
    return res.status(201).send(rs);
  }
  async delete(req, res) {
    const userId = req.query;
    const rs = await service.deleteUser(userId);
    return res.status(201).send(rs);
  }
  async session(req, res) {
    const data = _validations.validation.session.parse(req.body);
    const user = await service.session(data);
    const token = await res.jwtSign({}, {
      sign: {
        sub: user.id
      }
    });
    const refleshToken = await res.jwtSign({}, {
      sign: {
        sub: user.id,
        expiresIn: '7d'
      }
    });
    const dt = {
      token
    };
    return res.setCookie('refresh', refleshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true
    }).send(dt).status(201);
  }
  async sincro(req, res) {
    const rs = await service.sincron();
    return res.status(201).send(rs);
  }
  async star(req, res) {
    const {
      userId,
      star
    } = req.body;
    const rs = await service.star(userId, star);
    return res.status(201).send(rs);
  }
}
exports.Controller = Controller;