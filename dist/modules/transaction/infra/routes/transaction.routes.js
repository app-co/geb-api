"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transaction = void 0;

var _Auth = require("../../../../shared/midle/Auth");

var _express = require("express");

var _TransactionController = require("../controller/TransactionController");

const transaction = (0, _express.Router)();
exports.transaction = transaction;
const controler = new _TransactionController.TransactionControler();
transaction.post('/create-transaction', _Auth.Auth, controler.create);
transaction.get('/find-transaction/:id', _Auth.Auth, controler.findById);
transaction.get('/list-all-transaction', _Auth.Auth, controler.listAll);
transaction.get('/list-by-prestador', _Auth.Auth, controler.findByPrestador);
transaction.get('/list-by-consumidor', _Auth.Auth, controler.findByConsumidor);
transaction.get('/ponts-transaction', _Auth.Auth, controler.pontos);
transaction.delete('/delete-transaction/:id', _Auth.Auth, controler.del);