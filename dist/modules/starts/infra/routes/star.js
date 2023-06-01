"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.star = void 0;

var _Auth = require("../../../../shared/midle/Auth");

var _express = require("express");

var _controller = require("../controller");

const star = (0, _express.Router)();
exports.star = star;
const controler = new _controller.StarController();
star.use(_Auth.Auth);
star.post('/assest', controler.create);