"use strict";

var _env = require("./env");
var _app = require("./app");
_app.app.listen({
  host: '0.0.0.0',
  port: _env.env.PORT
}).then(() => console.log('server is runing on port'));