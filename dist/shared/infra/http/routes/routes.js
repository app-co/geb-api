"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _routes = require("../../../../modules/B2b/infra/routes");

var _index = require("../../../../modules/consumo/infra/routes/index.routes");

var _routes2 = require("../../../../modules/convidado/infra/routes");

var _routes3 = require("../../../../modules/indication/infra/routes");

var _routes4 = require("../../../../modules/Links/http/routes");

var _routes5 = require("../../../../modules/posts/http/routes/routes");

var _routes6 = require("../../../../modules/presensa/infra/routes");

var _routes7 = require("../../../../modules/situation/infra/routes");

var _routes8 = require("../../../../modules/starts/infra/routes");

var _routes9 = require("../../../../modules/transaction/infra/routes/routes.routes");

var _routes10 = require("../../../../modules/users/infra/routes/routes");

var _express = require("express");

const routes = (0, _express.Router)();
exports.routes = routes;
routes.use(_routes10.UserRoute);
routes.use(_routes5.postRoute);
routes.use(_index.ConsumoRoute);
routes.use(_routes9.TransactionRoute);
routes.use(_routes6.PresensaRoute);
routes.use(_routes.b2bRoute);
routes.use(_routes3.IndicationRoute);
routes.use(_routes8.RouteStar);
routes.use(_routes2.routeGuest);
routes.use(_routes7.situationRoute);
routes.use(_routes4.LinksRoute);