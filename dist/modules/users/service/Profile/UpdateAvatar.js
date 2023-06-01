"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateAvatar = void 0;

var _IUsersRespository = require("../../repositories/IUsersRespository");

var _AppError = require("../../../../shared/errors/AppError");

var _IStorageProviders = _interopRequireDefault(require("../../../../shared/StorageProvider/models/IStorageProviders"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateAvatar = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Storage')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _IStorageProviders.default === "undefined" ? Object : _IStorageProviders.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateAvatar {
  constructor(userRepository, store) {
    this.userRepository = userRepository;
    this.store = store;
  }

  async execute(id, avatar) {
    const user = await this.userRepository.findByIdProfile(id);

    if (!user) {
      throw new _AppError.Err('Perfil não encontrado');
    }

    if (user?.avatarPath) {
      await this.store.deleteFile(user.avatarPath, 'avatar');
    }

    const av = await this.store.saveFile(avatar, 'avatar');
    const dados = { ...user,
      avatar: `https://geb-networking.s3.sa-east-1.amazonaws.com/avatar/${av}`,
      avatarPath: av
    };
    const prof = await this.userRepository.updateProfile(dados);
    return prof;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateAvatar = UpdateAvatar;