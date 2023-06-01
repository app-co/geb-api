"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinksRoute = void 0;

var _Auth = require("../../../../shared/midle/Auth");

var _express = require("express");

var _links = require("./links");

const LinksRoute = (0, _express.Router)();
exports.LinksRoute = LinksRoute;
LinksRoute.use(_Auth.Auth);
LinksRoute.use('/links', _links.links);