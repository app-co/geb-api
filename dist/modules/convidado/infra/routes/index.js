"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routeGuest = void 0;

var _express = require("express");

var _guestRoute = require("./guestRoute");

const routeGuest = (0, _express.Router)();
exports.routeGuest = routeGuest;
routeGuest.use('/guest', _guestRoute.guest);