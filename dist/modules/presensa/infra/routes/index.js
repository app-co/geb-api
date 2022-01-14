"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresensaRoute = void 0;

var _express = require("express");

var _routePresensa = require("./routePresensa.routes");

const PresensaRoute = (0, _express.Router)();
exports.PresensaRoute = PresensaRoute;
PresensaRoute.use('/presenca', _routePresensa.RoutePresensa);