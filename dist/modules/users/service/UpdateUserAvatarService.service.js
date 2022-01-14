"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarService = void 0;

var _AppError = require("../../../shared/*/errors/AppError");

var _IStorageProviders = _interopRequireDefault(require("../../../shared/*/StorageProvider/models/IStorageProviders"));

var _tsyringe = require("tsyringe");

var _client = require(".prisma/client");

var _IUsersRespository = require("../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateUserAvatarService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Storage')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _IStorageProviders.default === "undefined" ? Object : _IStorageProviders.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserAvatarService {
  constructor(userRepository, storage) {
    this.userRepository = userRepository;
    this.storage = storage;
  }

  async execute({
    user_id,
    avatar
  }) {
    const find = await this.userRepository.findById(user_id);

    if (!find) {
      throw new _AppError.Err('user not found');
    }

    if (find.avatar) {
      await this.storage.deleteFile(find.avatar, 'avatar');
    }

    await this.storage.saveFile(avatar, 'avatar');
    const {
      user
    } = new _client.PrismaClient();
    const updateAvatar = await user.update({
      where: {
        id: find.id
      },
      data: {
        avatar
      }
    });
    return updateAvatar;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateUserAvatarService = UpdateUserAvatarService;