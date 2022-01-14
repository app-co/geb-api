"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsumoRoute = void 0;

var _express = require("express");

var _consumo = require("./consumo.routes");

const ConsumoRoute = (0, _express.Router)();
exports.ConsumoRoute = ConsumoRoute;
ConsumoRoute.use('/consumo', _consumo.consumo);