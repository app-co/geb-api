"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clients = exports.app = void 0;

require("reflect-metadata");

var _AppError = require("../../errors/AppError");

var _celebrate = require("celebrate");

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _http = require("http");

var _socket = _interopRequireDefault(require("socket.io"));

var _path = _interopRequireDefault(require("path"));

var _index = require("./routes/index.routes");

require("../../container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import-helpers/order-imports */
const app = (0, _express.default)();
exports.app = app;
const server = (0, _http.createServer)(app);
const io = new _socket.default.Server(server);
const clients = [];
exports.clients = clients;
io.on('connection', client => {
  console.log(`conectado ${client.id}`);
});
io.off('dis', h => {
  console.log(`disconectado ${h.id}`);
}); // app.use(rateLimiter);

app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_index.Route);
app.use((0, _celebrate.errors)());
app.use((req, res, nex) => {
  req.io = io;
  nex();
});
app.use('/file/post', _express.default.static(_path.default.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'post')));
app.use('/file/avatar', _express.default.static(_path.default.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'avatar')));
app.use('/file/logo', _express.default.static(_path.default.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'logo')));
app.use((err, req, res, _) => {
  if (err instanceof _AppError.Err) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.log(err);
  return res.status(500).json({
    status: 'error',
    message: 'Erro interno'
  });
});
server.listen(3333, () => console.log('listening on port 3333'));