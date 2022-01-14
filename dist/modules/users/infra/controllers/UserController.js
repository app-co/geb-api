"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = void 0;

var _CreateUserService = require("../../../*/users/service/CreateUserService");

var _DeleteUserService = require("../../../*/users/service/DeleteUserService.service");

var _FindUniqUser = require("../../../*/users/service/FindUniqUser.service");

var _ListAllUsersService = require("../../../*/users/service/ListAllUsersService.service");

var _SessionService = require("../../../*/users/service/SessionService.service");

var _UpdateLogoService = require("../../../*/users/service/UpdateLogoService.service");

var _UpdatePadrinhoService = require("../../../*/users/service/UpdatePadrinhoService");

var _UpdateProfileService = require("../../../*/users/service/UpdateProfileService.service");

var _UpdateUserAvatarService = require("../../../*/users/service/UpdateUserAvatarService.service");

var _tsyringe = require("tsyringe");

var _UpdateUserTokenService = require("../../service/UpdateUserTokenService.service");

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class UserController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_CreateUserService.CreateUserService);

    const {
      nome,
      membro,
      senha,
      whats,
      workName,
      CNPJ,
      CPF,
      email,
      ramo,
      enquadramento,
      adm
    } = req.body;
    const user = await service.execute({
      nome,
      membro,
      senha,
      whats,
      workName,
      CNPJ,
      CPF,
      email,
      ramo,
      enquadramento,
      adm
    });
    return res.json(user);
  }

  async update(req, res) {
    const service = _tsyringe.container.resolve(_UpdateProfileService.UpdateProfileService);

    const {
      nome,
      membro,
      whats,
      workName,
      CNPJ,
      CPF,
      email,
      links,
      ramo,
      enquadramento,
      adm
    } = req.body;
    const {
      id
    } = req.user;
    const user = await service.execute({
      nome,
      membro,
      whats,
      workName,
      CNPJ,
      CPF,
      ramo,
      email,
      links,
      enquadramento,
      adm,
      id
    });
    return res.json(user);
  }

  async updateAvatar(req, res) {
    const service = _tsyringe.container.resolve(_UpdateUserAvatarService.UpdateUserAvatarService);

    const user_id = req.user.id;
    const avatar = req.file.filename; // fs.unlinkSync(req.file!.path);

    const update = await service.execute({
      user_id,
      avatar
    });
    return res.json(update);
  }

  async updateLogo(req, res) {
    const service = _tsyringe.container.resolve(_UpdateLogoService.UpdateLogoService);

    const user_id = req.user.id;
    const logo = req.file.filename; // fs.unlinkSync(req.file!.path);

    const update = await service.execute({
      user_id,
      logo
    });
    return res.json(update);
  }

  async findAll(req, res) {
    const service = _tsyringe.container.resolve(_ListAllUsersService.ListAllUserService);

    const user = await service.execute();
    return res.json(user);
  }

  async session(req, res) {
    const service = _tsyringe.container.resolve(_SessionService.SessionService);

    const {
      membro,
      senha
    } = req.body;
    const user = await service.execute({
      membro,
      senha
    });
    return res.json(user);
  }

  async delete(req, res) {
    const service = _tsyringe.container.resolve(_DeleteUserService.DeleteUserService);

    const {
      membro
    } = req.body;
    const user = await service.execute(membro);
    return res.json(user);
  }

  async findUnicUser(req, res) {
    const service = _tsyringe.container.resolve(_FindUniqUser.FindUniqUser);

    const {
      id
    } = req.query;
    const user = await service.execute({
      id: String(id)
    });
    return res.json(user);
  }

  async updateToken(req, res) {
    const service = _tsyringe.container.resolve(_UpdateUserTokenService.UpdateUserTokenService);

    const {
      token
    } = req.body;
    const {
      id
    } = req.user;
    const up = await service.execute({
      token,
      id
    });
    return res.json(up);
  }

  async updatePadrinho(req, res) {
    const service = _tsyringe.container.resolve(_UpdatePadrinhoService.UpdatePadrinhoService);

    const {
      user_id
    } = req.body;
    const user = await service.execute({
      user_id
    });
    return res.json(user);
  }

}

exports.UserController = UserController;