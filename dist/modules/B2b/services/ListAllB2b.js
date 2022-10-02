"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAllB2b = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _IB2bRepository = require("../repositories/IB2bRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListAllB2b = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaB2b')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IB2bRepository.IB2bRepository === "undefined" ? Object : _IB2bRepository.IB2bRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListAllB2b {
  constructor(b2bRepository, cache) {
    this.b2bRepository = b2bRepository;
    this.cache = cache;
  }

  async execute() {
    let list = await this.cache.recover('b2b');

    if (!list) {
      list = await this.b2bRepository.listAllB2b();
      await this.cache.save('b2b', list);
    }

    return list;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.ListAllB2b = ListAllB2b;