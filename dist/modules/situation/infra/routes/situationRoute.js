"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.situation = void 0;

var _Auth = require("../../../../shared/midle/Auth");

var _express = require("express");

var _controller = require("../controller");

const situation = (0, _express.Router)();
exports.situation = situation;
const controler = new _controller.SituationController();
situation.use(_Auth.Auth);
situation.put('/update-situation', controler.update);