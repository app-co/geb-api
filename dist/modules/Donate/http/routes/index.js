"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DonateRoute = void 0;

var _Auth = require("../../../../shared/midle/Auth");

var _express = require("express");

var _donate = require("./donate");

const DonateRoute = (0, _express.Router)();
exports.DonateRoute = DonateRoute;
DonateRoute.use(_Auth.Auth);
DonateRoute.use('/donate', _donate.donate);