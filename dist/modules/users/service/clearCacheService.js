"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCacheService = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let clearCacheService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class clearCacheService {
  constructor(cache) {
    this.cache = cache;
  }

  async execute() {
    await this.cache.invalidate('users');
    await this.cache.invalidatePrefix(`individualPonts`);
    await this.cache.invalidate('post');
    await this.cache.invalidate('profile');
    await this.cache.invalidatePrefix(`individualPonts`);
    await this.cache.invalidate('padrinho');
    await this.cache.invalidate(`indication`);
    await this.cache.invalidatePrefix(`indication-indicado`);
    await this.cache.invalidatePrefix('indiQuem');
    await this.cache.invalidatePrefix('individualPonts');
    await this.cache.invalidate('orderTransaction');
    await this.cache.invalidatePrefix(`order-transaction-consumidor`);
    await this.cache.invalidatePrefix('order-transaction-prestador');
    await this.cache.invalidate('b2b');
    await this.cache.invalidatePrefix('b2bSend');
    await this.cache.invalidatePrefix('b2bReci');
    await this.cache.invalidatePrefix('individualPonts');
  }

}) || _class) || _class) || _class) || _class);
exports.clearCacheService = clearCacheService;