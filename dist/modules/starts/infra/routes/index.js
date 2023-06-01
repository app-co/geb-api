"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouteStar = void 0;

var _express = require("express");

var _star = require("./star");

const RouteStar = (0, _express.Router)();
exports.RouteStar = RouteStar;
RouteStar.use('/star', _star.star);