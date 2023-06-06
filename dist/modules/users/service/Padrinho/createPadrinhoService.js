"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePadrinhoService = void 0;

var _IUsersRespository = require("../../repositories/IUsersRespository");

var _ICacheProvider = _interopRequireDefault(require("../../../../shared/container/providers/model/ICacheProvider"));

var _AppError = require("../../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreatePadrinhoService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreatePadrinhoService {
  constructor(userRepository, cache) {
    this.userRepository = userRepository;
    this.cache = cache;
  }

  async execute({
    user_id,
    apadrinhado_name,
    apadrinhado_id,
    qnt
  }) {
    const find = await this.userRepository.findSituation(apadrinhado_id);
    const al = await this.userRepository.listAllPadrinho();
    console.log(find);

    if (!find) {
      throw new _AppError.Err('membro not found');
    }

    if (find?.apadrinhado) {
      throw new _AppError.Err('Este membro já está apadrinhado');
    }

    await this.userRepository.updateSituation({
      id: find?.id,
      firstLogin: find.firstLogin,
      apadrinhado: true,
      inativo: find.inativo
    });
    const create = await this.userRepository.createPadrinho({
      user_id,
      apadrinhado_id,
      apadrinhado_name,
      qnt
    });
    await this.cache.invalidate('users');
    await this.cache.invalidate('profile');
    await this.cache.invalidatePrefix(`individualPonts`);
    await this.cache.invalidate('padrinho');
    return create;
  }

  async listAll() {
    const list = await this.userRepository.listAllPadrinho();
    return list;
  }

  async listByPadrinho({
    id
  }) {
    const list = await this.userRepository.findPadrinhoByUserId(id);

    if (!list) {
      throw new _AppError.Err('Padrinho not found');
    }

    return list;
  }

  async delele({
    id
  }) {
    const list = await this.userRepository.findPadrinhoById(id);

    if (!list) {
      throw new _AppError.Err('Padrinho not found');
    }

    await this.userRepository.deletePadrinho(id);
    return list;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreatePadrinhoService = CreatePadrinhoService;