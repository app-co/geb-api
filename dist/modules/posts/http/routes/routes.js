"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postRoute = void 0;

var _express = require("express");

var _post = require("./post.routes");

const postRoute = (0, _express.Router)();
exports.postRoute = postRoute;
postRoute.use('/post', _post.post);