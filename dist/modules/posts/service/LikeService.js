"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LikeService = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _AppError = require("../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _IPostRepositoty = require("../repositories/IPostRepositoty");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let LikeService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaPost')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPostRepositoty.IPostsRepository === "undefined" ? Object : _IPostRepositoty.IPostsRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class LikeService {
  constructor(postRepository, cache) {
    this.postRepository = postRepository;
    this.cache = cache;
  }

  async execute(user_id, fk_id_post) {
    const find = await this.postRepository.findById(fk_id_post);
    const findLik = await this.postRepository.findLikeByUserId(user_id);

    if (findLik) {
      throw new _AppError.Err('like ja criado');
    }

    if (!find) {
      throw new _AppError.Err('post nao encontrado');
    }

    const lk = await this.postRepository.createLike(user_id, fk_id_post);
    await this.cache.invalidate('post');
    return lk;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.LikeService = LikeService;