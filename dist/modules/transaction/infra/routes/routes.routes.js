"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransactionRoute = void 0;

var _express = require("express");

var _transaction = require("./transaction.routes");

const TransactionRoute = (0, _express.Router)();
exports.TransactionRoute = TransactionRoute;
TransactionRoute.use('/transaction', _transaction.transaction);