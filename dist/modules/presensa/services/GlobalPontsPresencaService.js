"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalPontsPresencaService = void 0;

var _IUsersRespository = require("../../users/repositories/IUsersRespository");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _utils = require("../../../utils");

var _IPresençaRepository = require("../repositories/IPresen\xE7aRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let GlobalPontsPresencaService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('Presenca')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IPresençaRepository.IPresencaRespository === "undefined" ? Object : _IPresençaRepository.IPresencaRespository, typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class GlobalPontsPresencaService {
  constructor(presencaRepository, userRepository, cache) {
    this.presencaRepository = presencaRepository;
    this.userRepository = userRepository;
    this.cache = cache;
  }

  async execute() {
    let listAllUser = await this.cache.recover('list-all-users');
    let listAllPresenca = await this.cache.recover('presenca');
    console.log(listAllPresenca);

    if (!listAllPresenca) {
      listAllPresenca = await this.presencaRepository.listAllPresenca();
      await this.cache.save('presenca', listAllPresenca);
      console.log('pontospresenca: passou pelo banco');
    }

    if (!listAllUser) {
      listAllUser = await this.userRepository.listAllUser();
      await this.cache.save('list-all-users', listAllUser);
      console.log('pontospresenca: passou pelo banco');
    }

    const global = listAllUser.map(user => {
      const userPresenca = listAllPresenca.filter(h => h.user_id === user.id);
      const qnt = userPresenca.length;
      return {
        id: user.id,
        nome: user.nome,
        pontos: qnt * _utils.pontos.presenca,
        quantidade: qnt
      };
    }).sort((h, b) => {
      if (h.nome > b.nome) {
        return -0;
      }

      return -1;
    }).sort((a, b) => {
      return b.pontos - a.pontos;
    }).map((h, i) => {
      return { ...h,
        rank: i + 1
      };
    });
    return global;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.GlobalPontsPresencaService = GlobalPontsPresencaService;