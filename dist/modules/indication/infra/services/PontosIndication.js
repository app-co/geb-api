"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PontosIndication = void 0;

var _IUsersRespository = require("../../../users/repositories/IUsersRespository");

var _ICacheProvider = _interopRequireDefault(require("../../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _IIndicationRepository = require("../repositories/IIndicationRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let PontosIndication = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaIndication')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IIndicationRepository.IIndicationRepository === "undefined" ? Object : _IIndicationRepository.IIndicationRepository, typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class PontosIndication {
  constructor(indRepo, userRepo, cache) {
    this.indRepo = indRepo;
    this.userRepo = userRepo;
    this.cache = cache;
  }

  async execute() {
    let users = await this.cache.recover('list-all-users');
    let indi = await this.cache.recover('indication');

    if (!users) {
      users = await this.userRepo.listAllUser();
      await this.cache.save('list-all-users', users);
    }

    if (!indi) {
      indi = await this.indRepo.listAll();
      await this.cache.save('indication', indi);
    }

    const pt = users.map(user => {
      const fil = indi.filter(h => h.quemIndicou_id === user.id && h.validate === true);
      const pont = {
        id: user.id,
        nome: user.nome,
        pontos: fil.length * 10
      };
      return pont;
    }).sort((a, b) => {
      if (a.nome > b.nome) {
        return -0;
      }

      return -1;
    }).sort((a, b) => {
      return b.pontos - a.pontos;
    }).map((h, i) => {
      return { ...h,
        ranck: i + 1
      };
    });
    return pt;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.PontosIndication = PontosIndication;