"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ind = void 0;

var _express = require("express");

var _IndicationController = require("../controllers/IndicationController");

const ind = (0, _express.Router)();
exports.ind = ind;
const contro = new _IndicationController.IndicationController();
ind.post('/create-indication', contro.create);
ind.put('/validate-indication', contro.validate);
ind.get('/list-all-indication', contro.listAll);
ind.get('/pontos-indication', contro.pontos);
ind.get('/list-by-indication', contro.listIndicado);
ind.get('/list-by-who-ind-indication', contro.quemInd);
ind.delete('/del-indication/:id', contro.del);