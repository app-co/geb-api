"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostController = void 0;

var _CreatePostService = require("../../service/CreatePostService");

var _LikeService = require("../../service/LikeService");

var _ListAllPostService = require("../../service/ListAllPostService.service");

var _tsyringe = require("tsyringe");

/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import fs from 'fs';
// import path from 'path';
// import sharp from 'sharp';
class PostController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_CreatePostService.CreatePostService);

    const {
      description,
      fk_id_user,
      image,
      like
    } = req.body; // const post = req.file!.filename;
    // return res.json(req.file);
    // await sharp(req.file?.path)
    //    .resize(500)
    //    .jpeg({ quality: 70 })
    //    .toFile(path.resolve(req.file!.destination, 'post', post));

    const po = await service.execute({
      description,
      fk_id_user,
      image,
      like
    });
    return res.json(po);
  }

  async like(req, res) {
    const service = _tsyringe.container.resolve(_LikeService.LikeService);

    const {
      fk_id_post
    } = req.body;
    const user_id = req.user.id;
    const like = await service.execute(user_id, fk_id_post);
    req.io.emit('like', like);
    return res.json(like);
  }

  async listAllPosts(req, res) {
    const service = _tsyringe.container.resolve(_ListAllPostService.ListAllPost);

    const post = await service.execute();
    return res.json(post);
  }

}

exports.PostController = PostController;