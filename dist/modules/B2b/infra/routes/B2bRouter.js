"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2b = void 0;

var _Auth = require("../../../../shared/midle/Auth");

var _express = require("express");

var _B2bController = require("../controllers/B2bController");

const b2b = (0, _express.Router)();
exports.b2b = b2b;
const controller = new _B2bController.B2bController();
b2b.post('/create-b2b', _Auth.Auth, controller.create);
b2b.put('/validate-b2b', _Auth.Auth, controller.validate);
b2b.get('/list-all-b2b', _Auth.Auth, controller.listAll);
b2b.get('/list-by-send/', _Auth.Auth, controller.findBySend);
b2b.get('/list-by-recevid/', _Auth.Auth, controller.findByRecevid);
b2b.get('/pontos-b2b', _Auth.Auth, controller.pontos);
b2b.delete('/del-b2b/:id', _Auth.Auth, controller.delete);