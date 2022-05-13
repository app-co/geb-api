"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateLogoService = void 0;

var _IStorageProviders = _interopRequireDefault(require("../../../shared/StorageProvider/models/IStorageProviders"));

var _tsyringe = require("tsyringe");

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
    logo
  }) {
    await this.storage.deleteFile(logo, 'logo');
    const res = await this.storage.saveFile(logo, 'logo');
    const url = `https://geb-app.s3.us-east-2.amazonaws.com/logo/${res}`;
    return url;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateLogoService = UpdateLogoService;