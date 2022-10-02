"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListByWhoIndService = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../../shared/container/providers/model/ICacheProvider"));

var _tsyringe = require("tsyringe");

var _IIndicationRepository = require("../repositories/IIndicationRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListByWhoIndService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaIndication')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IIndicationRepository.IIndicationRepository === "undefined" ? Object : _IIndicationRepository.IIndicationRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListByWhoIndService {
  constructor(indRepository, cache) {
    this.indRepository = indRepository;
    this.cache = cache;
  }

  async execute(id) {
    let list = await this.cache.recover(`indiQuem:${id}`);

    if (!list) {
      list = await this.indRepository.findByQuemIndicou(id);
      await this.cache.save(`indiQuem:${id}`, list);
    }

    return list;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.ListByWhoIndService = ListByWhoIndService;