"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Routes = Routes;
var _routes = require("../../modules/relationShip/routes");
var _aut = require("../../modules/user/aut.routes");
var _routes2 = require("../../modules/user/routes");
async function Routes(app) {
  app.register(_routes2.userRoute);
  app.register(_aut.userAutRoute);
  app.register(_routes.reletionShipRoutes);
}