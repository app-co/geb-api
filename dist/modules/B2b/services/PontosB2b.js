"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PontosB2b = void 0;

var _IUsersRespository = require("../../users/repositories/IUsersRespository");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _IB2bRepository = require("../repositories/IB2bRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let PontosB2b = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaB2b')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IB2bRepository.IB2bRepository === "undefined" ? Object : _IB2bRepository.IB2bRepository, typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class PontosB2b {
  constructor(repoB2b, repoUser, cache) {
    this.repoB2b = repoB2b;
    this.repoUser = repoUser;
    this.cache = cache;
  }

  async exec() {
    let b2b = await this.cache.recover('b2b');
    let users = await this.cache.recover('list-all-users');

    if (!b2b) {
      b2b = await this.repoB2b.listAllB2b();
      await this.cache.save('b2b', b2b);
    }

    if (!users) {
      users = await this.repoUser.listAllUser();
      await this.cache.save('list-all-users', users);
    }

    const relatorioSend = users.map(user => {
      const cons = b2b.filter(h => h.send_id === user.id && h.validate === true);
      const send = {
        id: user.id,
        nome: user.nome,
        pontos: cons.length * 10
      };
      return {
        send
      };
    }).sort((a, b) => {
      if (a.send.nome > b.send.nome) {
        return -0;
      }

      return -1;
    }).sort((a, b) => {
      return b.send.pontos - a.send.pontos;
    }).map((h, i) => {
      return { ...h.send,
        rank: i + 1
      };
    });
    const relatori = {
      send: relatorioSend
    };
    return relatori;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.PontosB2b = PontosB2b;