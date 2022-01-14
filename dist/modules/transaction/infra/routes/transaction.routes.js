"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transaction = void 0;

var _Auth = require("../../../../shared/*/midle/Auth");

var _express = require("express");

var _TransactionController = require("../controller/TransactionController");

const transaction = (0, _express.Router)();
exports.transaction = transaction;
const controler = new _TransactionController.TransactionControler();
transaction.post('/', _Auth.Auth, controler.create);
transaction.get('/list', _Auth.Auth, controler.find);
transaction.delete('/del/:id', _Auth.Auth, controler.del);