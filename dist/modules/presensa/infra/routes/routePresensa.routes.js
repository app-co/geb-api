"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoutePresensa = void 0;

var _Auth = require("../../../../shared/*/midle/Auth");

var _express = require("express");

var _PresencaController = require("../controllers/PresencaController");

const RoutePresensa = (0, _express.Router)();
exports.RoutePresensa = RoutePresensa;
const controler = new _PresencaController.PresensaController();
RoutePresensa.post('/', _Auth.Auth, controler.create);
RoutePresensa.patch('/update', _Auth.Auth, controler.update);
RoutePresensa.get('/', _Auth.Auth, controler.list);
RoutePresensa.get('/all', _Auth.Auth, controler.listAll);
RoutePresensa.get('/rank', _Auth.Auth, controler.rank);