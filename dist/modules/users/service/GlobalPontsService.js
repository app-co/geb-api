"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalPontsService = void 0;

var _IB2bRepository = require("../../B2b/repositories/IB2bRepository");

var _IIndicationRepository = require("../../indication/infra/repositories/IIndicationRepository");

var _IPresençaRepository = require("../../presensa/repositories/IPresen\xE7aRepository");

var _ITransactionRespository = require("../../transaction/repositories/ITransactionRespository");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _utils = require("../../../utils");

var _IUsersRespository = require("../repositories/IUsersRespository");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let GlobalPontsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaUser')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaTransaction')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('Presenca')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaIndication')(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaB2b')(target, undefined, 4);
}, _dec7 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 5);
}, _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [typeof _IUsersRespository.IUsersRepository === "undefined" ? Object : _IUsersRespository.IUsersRepository, typeof _ITransactionRespository.ITransactionRepository === "undefined" ? Object : _ITransactionRespository.ITransactionRepository, typeof _IPresençaRepository.IPresencaRespository === "undefined" ? Object : _IPresençaRepository.IPresencaRespository, typeof _IIndicationRepository.IIndicationRepository === "undefined" ? Object : _IIndicationRepository.IIndicationRepository, typeof _IB2bRepository.IB2bRepository === "undefined" ? Object : _IB2bRepository.IB2bRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = class GlobalPontsService {
  constructor(userRepository, repoTransaction, presencaRepository, indRepo, repoB2b, cache) {
    this.userRepository = userRepository;
    this.repoTransaction = repoTransaction;
    this.presencaRepository = presencaRepository;
    this.indRepo = indRepo;
    this.repoB2b = repoB2b;
    this.cache = cache;
  }

  async execute() {
    // let ListAllusers = await this.cache.recover<User[]>('list-all-users');
    // let transaction = await this.cache.recover<Transaction[]>('transaction');
    // let listAllPresenca = await this.cache.recover<Presenca[]>('presenca');
    // let indi = await this.cache.recover<Indication[]>('indication');
    // let b2b = await this.cache.recover<B2b[]>('b2b');
    const ListAllusers = await this.userRepository.listAllUser();
    const transaction = await this.repoTransaction.listAllTransaction();
    const listAllPresenca = await this.presencaRepository.listAllPresenca();
    const indi = await this.indRepo.listAll();
    const b2b = await this.repoB2b.listAllB2b();
    const Concumo = ListAllusers.map((user, index) => {
      const cons = transaction?.filter(h => h.consumidor_id === user.id);
      const valor = cons.reduce((ac, i) => {
        return ac + Number(i.valor);
      }, 0);
      const consumo = {
        id: user.id,
        nome: user.nome,
        pontos: cons.length * 10,
        valor
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
    const Vendas = ListAllusers.map((user, index) => {
      const cons = transaction.filter(h => h.prestador_id === user.id);
      const valor = cons.reduce((ac, i) => {
        return ac + Number(i.valor);
      }, 0);
      const consumo = {
        id: user.id,
        nome: user.nome,
        pontos: cons.length * 10,
        valor
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
    const Pres = ListAllusers.map(user => {
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
    const Ind = ListAllusers.map(user => {
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
    const B2 = ListAllusers.map(user => {
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
      compras: Concumo,
      vendas: Vendas,
      presenca: Pres,
      indication: Ind,
      b2b: B2
    };
    return relatori;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.GlobalPontsService = GlobalPontsService;