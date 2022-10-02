"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.b2bRoute = void 0;

var _express = require("express");

var _B2bRouter = require("./B2bRouter");

const b2bRoute = (0, _express.Router)();
exports.b2bRoute = b2bRoute;
b2bRoute.use('/b2b', _B2bRouter.b2b);