"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PontosTransaction = void 0;

var _IUsersRespository = require("../../users/repositories/IUsersRespository");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _ITransactionRespository = require("../repositories/ITransactionRespository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let PontosTransaction = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaTransaction')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _ITransactionRespository.ITransactionRepository === "undefined" ? Object : _ITransactionRespository.ITransactionRepository, typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class PontosTransaction {
  constructor(repoTransaction, repoUser, cache) {
    this.repoTransaction = repoTransaction;
    this.repoUser = repoUser;
    this.cache = cache;
  }

  async exec() {
    let users = await this.cache.recover('list-all-users');
    let transaction = await this.cache.recover('transaction');

    if (!users) {
      users = await this.repoUser.listAllUser();
      console.log('passou pelo banco');
      await this.cache.save('list-all-users', users);
    }

    if (!transaction) {
      transaction = await this.repoTransaction.listAllTransaction();
      console.log('passou pelo banco');
      await this.cache.save('transaction', transaction);
    }

    const relatorioConsumo = users.map((user, index) => {
      const cons = transaction.filter(h => h.consumidor_id === user.id);
      const consumo = {
        id: user.id,
        nome: user.nome,
        pontos: cons.length * 10
      };
      return {
        consumo
      };
    }).sort((a, b) => {
      if (a.consumo.nome > b.consumo.nome) {
        return -0;
      }

      return -1;
    }).sort((a, b) => {
      return b.consumo.pontos - a.consumo.pontos;
    }).map((h, i) => {
      return { ...h.consumo,
        rank: i + 1
      };
    });
    const relatorioVendas = users.map((user, index) => {
      const cons = transaction.filter(h => h.prestador_id === user.id);
      const consumo = {
        id: user.id,
        nome: user.nome,
        pontos: cons.length * 10
      };
      return {
        consumo
      };
    }).sort((a, b) => {
      if (a.consumo.nome > b.consumo.nome) {
        return -0;
      }

      return -1;
    }).sort((a, b) => {
      return b.consumo.pontos - a.consumo.pontos;
    }).map((h, i) => {
      return { ...h.consumo,
        rank: i + 1
      };
    });
    const relatori = {
      compras: relatorioConsumo,
      vendas: relatorioVendas
    };
    return relatori;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.PontosTransaction = PontosTransaction;