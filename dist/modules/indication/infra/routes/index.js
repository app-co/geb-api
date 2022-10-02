"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndicationRoute = void 0;

var _Auth = require("../../../../shared/midle/Auth");

var _express = require("express");

var _indication = require("./indication");

const IndicationRoute = (0, _express.Router)();
exports.IndicationRoute = IndicationRoute;
IndicationRoute.use('/indication', _Auth.Auth, _indication.ind);