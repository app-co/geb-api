"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.donalte = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/model/ICacheProvider"));

var _AppError = require("../../../shared/errors/AppError");

var _tsyringe = require("tsyringe");

var _IDonateRepository = require("../repositories/IRepository/IDonateRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let donalte = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('donate')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('Cache')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IDonateRepository.IDonateRepository === "undefined" ? Object : _IDonateRepository.IDonateRepository, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class donalte {
  constructor(repoDonate, cache) {
    this.repoDonate = repoDonate;
    this.cache = cache;
  }

  async create({
    fk_id_user,
    itens
  }) {
    const itm = {
      fk_id_user,
      itens
    };
    const create = await this.repoDonate.create(itm);
    await this.cache.invalidate('donate');
    return create;
  }

  async findById(id) {
    const list = await this.repoDonate.findById(id);

    if (!list) {
      throw new _AppError.Err('Nada encontrado');
    }

    return list;
  }

  async listMany() {
    let list = await this.cache.recover('donate');

    if (!list) {
      list = await this.repoDonate.listMany();
      await this.cache.save(`list`, list);
    }

    return list;
  }

  async delete({
    id
  }) {
    const find = await this.repoDonate.findById(id);

    if (!find) {
      throw new _AppError.Err('donate not found');
    }

    await this.repoDonate.delete(id);
    await this.cache.invalidate('donate');
  }

  async validate({
    id
  }) {
    const find = await this.repoDonate.findById(id);

    if (!find) {
      throw new _AppError.Err('donate not found');
    }

    const validate = await this.repoDonate.validate(id);
    await this.cache.invalidate('donate');
    return validate;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.donalte = donalte;