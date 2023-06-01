"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLinkService = void 0;

var _AppError = require("../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _ILinksRepository = require("../repositories/IRepository/ILinksRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let updateLinkService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('link')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ILinksRepository.ILinksRepository === "undefined" ? Object : _ILinksRepository.ILinksRepository, typeof ICacheProvider === "undefined" ? Object : ICacheProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class updateLinkService {
  constructor(repomidia, cache) {
    this.repomidia = repomidia;
    this.cache = cache;
  }

  async create() {}

  async findById({
    id
  }) {
    const list = await this.repomidia.findById(id);

    if (!list) {
      throw new _AppError.Err('Nada encontrado');
    }

    return list;
  }

  async listMany() {
    const list = await this.repomidia.listMany();
    return list;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.updateLinkService = updateLinkService;