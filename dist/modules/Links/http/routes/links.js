"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.links = void 0;

var _express = require("express");

var _LinksController = require("../controller/LinksController");

const links = (0, _express.Router)();
exports.links = links;
const control = new _LinksController.LinksController();
links.post('/create-links', control.create);
links.get('/', control.listMany);