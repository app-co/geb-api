"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = void 0;

var _upload = _interopRequireDefault(require("../../../../config/*/upload"));

var _Auth = require("../../../../shared/*/midle/Auth");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _UserController = require("../controllers/UserController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const user = (0, _express.Router)();
exports.user = user;
const control = new _UserController.UserController();
const img = (0, _multer.default)(_upload.default);
user.post('/session', control.session);
user.post('/', control.create);
user.get('/', _Auth.Auth, control.findAll);
user.put('/update', _Auth.Auth, control.update);
user.delete('/del', _Auth.Auth, control.delete);
user.patch('/avatar', _Auth.Auth, img.single('avatar'), control.updateAvatar);
user.patch('/logo', _Auth.Auth, img.single('logo'), control.updateLogo);
user.get('/find', _Auth.Auth, control.findUnicUser);
user.put('/upToken', _Auth.Auth, control.updateToken);
user.put('/update-padrinho', _Auth.Auth, control.updatePadrinho);