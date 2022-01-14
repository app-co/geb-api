"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRoute = void 0;

var _express = require("express");

var _user = require("./user.routes");

const UserRoute = (0, _express.Router)();
exports.UserRoute = UserRoute;
UserRoute.use('/user', _user.user);