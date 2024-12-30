"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userAutRoute = userAutRoute;
var _controller = require("./controller");
var _verifyJwt = require("../../shared/middlewares/verify-jwt");
const controler = new _controller.Controller();
async function userAutRoute(app) {
  app.addHook('onRequest', _verifyJwt.Auth);
  app.get('/user', controler.byId);
  app.get('/users', controler.getAll);
  app.get('/user/hub', controler.byHub);
  app.put('/user', controler.updateUser);
  app.put('/user/profile', controler.updateProfile);
  app.post('/user/profile', controler.registerProfile);
  app.delete('/user/:id', controler.delete);
}