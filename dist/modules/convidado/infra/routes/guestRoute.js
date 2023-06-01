"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.guest = void 0;

var _Auth = require("../../../../shared/midle/Auth");

var _express = require("express");

var _controller = require("../controller");

const guest = (0, _express.Router)();
exports.guest = guest;
const controler = new _controller.ConvidadoController();
guest.use(_Auth.Auth);
guest.post('/create-guest', controler.create);
guest.get('/', controler.listAll);
guest.put('/up-guest', controler.update);