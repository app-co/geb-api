"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.donate = void 0;

var _express = require("express");

var _DonateController = require("../controller/DonateController");

const donate = (0, _express.Router)();
exports.donate = donate;
const control = new _DonateController.DonateController();
donate.post('/create', control.create);
donate.get('/:id/', control.findById);
donate.delete('/:id/', control.delete);
donate.put('/approved/:id/', control.approved);
donate.get('/', control.listMany);