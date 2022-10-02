"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePostService = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _IPostRepositoty = require("../repositories/IPostRepositoty");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePostService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaPost')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPostRepositoty.IPostsRepository === "undefined" ? Object : _IPostRepositoty.IPostsRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreatePostService {
  constructor(postRepository, cache) {
    this.postRepository = postRepository;
    this.cache = cache;
  }

  async execute({
    description,
    image,
    fk_id_user,
    like
  }) {
    const create = await this.postRepository.create({
      description,
      image,
      fk_id_user
    }, like);
    await this.cache.invalidate('post');
    return create;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreatePostService = CreatePostService;