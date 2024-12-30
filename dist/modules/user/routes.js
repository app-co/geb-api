"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRoute = userRoute;
var _controller = require("./controller");
const controler = new _controller.Controller();
async function userRoute(app) {
  app.post('/user/register', controler.register);
  app.post('/user/session', controler.session);
  app.post('/user/avaliation', controler.star);
  app.get('/sincro', controler.sincro);
}