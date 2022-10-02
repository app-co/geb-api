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
consumo.post('/order-transaction', _Auth.Auth, control.createOrder);
consumo.get('/find-order-prestador', _Auth.Auth, control.findOrderPrestador);
consumo.get('/find-order-consumidor', _Auth.Auth, control.findOrderConsumidor);
consumo.get('/find-all-order', _Auth.Auth, control.findAllOrder);
consumo.delete('/delete-order/:id', _Auth.Auth, control.deleteOrder); // consumo.post('/cons', Auth, control.createConsumidor);
// consumo.get('/listAll', Auth, control.listAll);
// consumo.get('/listValorP', Auth, control.listValorP);
// consumo.get('/listValorC', Auth, control.listValorC);