"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostController = void 0;

var _CreatePostService = require("../../../*/posts/service/CreatePostService");

var _LikeService = require("../../../*/posts/service/LikeService");

var _ListAllPostService = require("../../../*/posts/service/ListAllPostService.service");

var _tsyringe = require("tsyringe");

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class PostController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_CreatePostService.CreatePostService);

    const {
      description
    } = req.body;
    const user_id = req.user.id;
    const image = req.file.filename; // return res.json(req.file);
    // await sharp(req.file?.path)
    //    .resize(500)
    //    .jpeg({ quality: 70 })
    //    .toFile(path.resolve(req.file!.destination, 'post', image));

    const post = await service.execute({
      image: String(image),
      user_id,
      description
    }); // fs.unlinkSync(req.file!.path);

    req.io.emit('post', post);
    return res.json(post);
  }

  async like(req, res) {
    const service = _tsyringe.container.resolve(_LikeService.LikeService);

    const {
      image_id
    } = req.params;
    const like = await service.execute(image_id);
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