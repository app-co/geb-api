"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _index = require("../../../../modules/consumo/infra/routes/index.routes");

var _routes = require("../../../../modules/posts/http/routes/routes");

var _routes2 = require("../../../../modules/presensa/infra/routes");

var _routes3 = require("../../../../modules/transaction/infra/routes/routes.routes");

var _routes4 = require("../../../../modules/users/infra/routes/routes");

var _express = require("express");

const routes = (0, _express.Router)();
exports.routes = routes;
routes.use(_routes4.UserRoute);
routes.use(_routes.postRoute);
routes.use(_index.ConsumoRoute);
routes.use(_routes3.TransactionRoute);
routes.use(_routes2.PresensaRoute);