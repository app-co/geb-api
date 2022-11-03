"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserService = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _AppError = require("../../../shared/errors/AppError");

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _IUsersRespository = require("../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateUserService {
  constructor(userRepository, cache) {
    this.userRepository = userRepository;
    this.cache = cache;
  }

  async execute({
    nome,
    membro,
    senha,
    adm,
    id,
    apadrinhado,
    firstLogin,
    inativo,
    qntIndication,
    qntPadrinho
  }) {
    const find = await this.userRepository.findByMembro(membro);

    if (find) {
      throw new _AppError.Err('Esse membro já está cadastrado');
    }

    const has = await (0, _bcryptjs.hash)(senha, 8);
    const data = {
      nome,
      membro,
      senha: has,
      adm,
      id
    };
    const user = await this.userRepository.create(data, apadrinhado, firstLogin, inativo, qntIndication, qntPadrinho);
    await this.cache.invalidate('users');
    await this.cache.invalidatePrefix(`individualPonts`);
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateUserService = CreateUserService;