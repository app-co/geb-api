"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAllTransaction = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _ITransactionRespository = require("../repositories/ITransactionRespository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListAllTransaction = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaTransaction')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ITransactionRespository.ITransactionRepository === "undefined" ? Object : _ITransactionRespository.ITransactionRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListAllTransaction {
  constructor(transactionRepository, cache) {
    this.transactionRepository = transactionRepository;
    this.cache = cache;
  }

  async execute() {
    let tran = await this.cache.recover('transaction');

    if (!tran) {
      tran = await this.transactionRepository.listAllTransaction();
      console.log('listalltransaction: transaction');
      await this.cache.save('transaction', tran);
    }

    return tran;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.ListAllTransaction = ListAllTransaction;