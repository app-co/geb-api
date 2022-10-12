"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.post = void 0;

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _Auth = require("../../../../shared/midle/Auth");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _PostController = require("../controller/PostController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const post = (0, _express.Router)();
exports.post = post;
const controller = new _PostController.PostController();
const postUpload = (0, _multer.default)(_upload.default);
post.use(_Auth.Auth);
post.post('/', controller.create);
post.post('/like', controller.like);
post.get('/', controller.listAllPosts);