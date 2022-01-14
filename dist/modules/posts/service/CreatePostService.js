"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePostService = void 0;

var _IStorageProviders = _interopRequireDefault(require("../../../shared/*/StorageProvider/models/IStorageProviders"));

var _tsyringe = require("tsyringe");

var _IPostRepositoty = require("../repositories/IPostRepositoty");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePostService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaPost')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Storage')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IPostRepositoty.IPostsRepository === "undefined" ? Object : _IPostRepositoty.IPostsRepository, typeof _IStorageProviders.default === "undefined" ? Object : _IStorageProviders.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreatePostService {
  constructor(postRepository, storage) {
    this.postRepository = postRepository;
    this.storage = storage;
  }

  async execute({
    image,
    user_id,
    description
  }) {
    await this.storage.saveFile(image, 'posts');
    console.log(user_id, description);
    const create = await this.postRepository.create({
      image,
      user_id,
      description
    });
    return create;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreatePostService = CreatePostService;