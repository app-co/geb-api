"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.situationRoute = void 0;

var _express = require("express");

var _situationRoute = require("./situationRoute");

const situationRoute = (0, _express.Router)();
exports.situationRoute = situationRoute;
situationRoute.use('/situation', _situationRoute.situation);