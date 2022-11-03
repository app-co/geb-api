"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = void 0;

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _Auth = require("../../../../shared/midle/Auth");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _UserController = require("../controllers/UserController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const user = (0, _express.Router)();
exports.user = user;
const control = new _UserController.UserController();
const img = (0, _multer.default)(_upload.default);
user.post('/update-pass', control.updateSenha);
user.post('/create-user', control.create);
user.post('/session', control.session);
user.use(_Auth.Auth); // user.patch('/avatar', img.single('avatar'), control.updateAvatar);
// user.patch('/logo', img.single('logo'), control.updateLogo);

user.get('/list-all-user', control.listAll);
user.delete('/delete/:membro', control.deleteUser);
user.get('/find-user-by-id', control.findUserById); // user.put('/update', Auth, control.update);
// !! CREATE PROFILE */

user.post('/create-profile', control.createProfile);
user.put('/update-profile', control.updateProfile);
user.patch('/update-avatar', img.single('avatar'), control.updateAvatar);
user.patch('/update-logo', img.single('logo'), control.updateLogo); //! ! LINKS

user.post('/link/create', control.createLink); //! ! RANK GLOBAL

user.get('/global-rank', control.rank);
user.get('/global-rank-ind', control.rankIndividual); //! ! PADRINHO

user.post('/create-padrinho', control.createPadrinho); // user.get('/find', Auth, control.findUnicUser);
// user.put('/upToken', Auth, control.updateToken);
// user.put('/update-padrinho', Auth, control.updatePadrinho);
// user.put('/update-senha', Auth, control.updateSenhaUser);