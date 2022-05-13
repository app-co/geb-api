"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.consumo = void 0;

var _Auth = require("../../../../shared/midle/Auth");

var _express = require("express");

var _ConsumoController = require("../controller/ConsumoController");

const consumo = (0, _express.Router)();
exports.consumo = consumo;
const control = new _ConsumoController.ConsumoController();
consumo.post('/pres', _Auth.Auth, control.createPrestador);
consumo.post('/cons', _Auth.Auth, control.createConsumidor);
consumo.get('/listAll', _Auth.Auth, control.listAll);
consumo.get('/listValorP', _Auth.Auth, control.listValorP);
consumo.get('/listValorC', _Auth.Auth, control.listValorC);