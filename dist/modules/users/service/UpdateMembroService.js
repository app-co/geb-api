"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateMembroService = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _AppError = require("../../../shared/errors/AppError");

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _IUsersRespository = require("../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateMembroService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateMembroService {
  constructor(userRepository, cache) {
    this.userRepository = userRepository;
    this.cache = cache;
  }

  async execute({
    id,
    nome,
    membro,
    senha,
    token,
    adm
  }) {
    const findUser = await this.userRepository.findById(id);

    if (!findUser) {
      throw new _AppError.Err('Usuário não encontrado');
    }

    let hs = senha;

    if (senha) {
      const has = await (0, _bcryptjs.hash)(senha, 8);
      hs = has;
    }

    const update = await this.userRepository.updateMembro({
      id,
      nome,
      membro,
      senha: hs,
      adm,
      token
    });
    await this.cache.invalidate('users');
    return update;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateMembroService = UpdateMembroService;