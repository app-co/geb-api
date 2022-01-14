"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LikeService = void 0;

var _AppError = require("../../../shared/*/errors/AppError");

var _tsyringe = require("tsyringe");

var _client = require(".prisma/client");

var _IPostRepositoty = require("../repositories/IPostRepositoty");

var _dec, _dec2, _dec3, _dec4, _class;

let LikeService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaPost')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPostRepositoty.IPostsRepository === "undefined" ? Object : _IPostRepositoty.IPostsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class LikeService {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute(image_id) {
    const find = await this.postRepository.findById(image_id);

    if (!find) {
      throw new _AppError.Err('post nao encontrado');
    }

    const like = find.like += 1;
    const {
      post
    } = new _client.PrismaClient();
    const updateLIke = await post.update({
      where: {
        id: find.id
      },
      data: {
        like
      }
    });
    return updateLIke;
  }

}) || _class) || _class) || _class) || _class);
exports.LikeService = LikeService;