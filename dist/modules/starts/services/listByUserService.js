"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateStar = void 0;

var _tsyringe = require("tsyringe");

var _IStarRespository = require("../repositories/IStarRespository");

var _dec, _dec2, _dec3, _dec4, _class;

let CreateStar = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PrismaStar')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IStarRespository.IStarRepository === "undefined" ? Object : _IStarRespository.IStarRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateStar {
  constructor(starRepo) {
    this.starRepo = starRepo;
  }

  async exec() {}

}) || _class) || _class) || _class) || _class);
exports.CreateStar = CreateStar;