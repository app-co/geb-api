"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Route = void 0;

var _express = require("express");

var _routes = require("./routes");

const Route = (0, _express.Router)();
exports.Route = Route;
Route.use(_routes.routes);