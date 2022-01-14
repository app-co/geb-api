"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateLogoService = void 0;

var _AppError = require("../../../shared/*/errors/AppError");

var _IStorageProviders = _interopRequireDefault(require("../../../shared/*/StorageProvider/models/IStorageProviders"));

var _tsyringe = require("tsyringe");

var _client = require(".prisma/client");

var _IUsersRespository = require("../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateLogoService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Storage')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _IStorageProviders.default === "undefined" ? Object : _IStorageProviders.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateLogoService {
  constructor(userRepostiroy, storage) {
    this.userRepostiroy = userRepostiroy;
    this.storage = storage;
  }

  async execute({
    user_id,
    logo
  }) {
    const find = await this.userRepostiroy.findById(user_id);

    if (!find) {
      throw new _AppError.Err('usuário nao encontrado');
    }

    if (find.logotipo) {
      await this.storage.deleteFile(find.logotipo, 'logo');
    }

    await this.storage.saveFile(logo, 'logo');
    const {
      user
    } = new _client.PrismaClient();
    const updateLogo = await user.update({
      where: {
        id: find.id
      },
      data: {
        logotipo: logo
      }
    });
    return updateLogo;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateLogoService = UpdateLogoService;