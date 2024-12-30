"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reletionShipRoutes = reletionShipRoutes;
var _controller = require("./controller");
var _verifyJwt = require("../../shared/middlewares/verify-jwt");
const controler = new _controller.Controller();
async function reletionShipRoutes(app) {
  app.addHook('onRequest', _verifyJwt.Auth);
  app.post('/relationShip/register', controler.register);
  app.get('/relationShip/all', controler.all);
  app.get('/relationShip/byUser', controler.byUser);
  app.get('/relationShip/byReceptor', controler.byReceptor);
  app.get('/relationShip/podiun', controler.podiun);
  app.get('/relationShip/aprovation', controler.relationForAprovation);
  app.get('/relationShip/notValides/:type', controler.notValides);
  app.put('/relationShip/:id', controler.validate);
  app.delete('/relationShip/:id', controler.delete);
}