"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoutePresensa = void 0;

var _Auth = require("../../../../shared/midle/Auth");

var _express = require("express");

var _PresencaController = require("../controllers/PresencaController");

const RoutePresensa = (0, _express.Router)();
exports.RoutePresensa = RoutePresensa;
const controler = new _PresencaController.PresensaController();
RoutePresensa.use(_Auth.Auth);
RoutePresensa.post('/create-order-presenca', controler.createOrder);
RoutePresensa.post('/create-presenca', controler.create);
RoutePresensa.get('/list-all-order-presenca', controler.listAllOrder);
RoutePresensa.get('/list-all-presenca-user/', controler.listAllPresecaUser);
RoutePresensa.get('/list-all', controler.listAllPreseca);
RoutePresensa.delete('/delete-order/:id', controler.delte);
RoutePresensa.get('/rank-presenca', controler.rank); // RoutePresensa.patch('/update', Auth, controler.update);
// RoutePresensa.get('/', Auth, controler.list);
// RoutePresensa.get('/all', Auth, controler.listAll);