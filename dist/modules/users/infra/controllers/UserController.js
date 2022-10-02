"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = void 0;

var _createLink = require("../../service/createLink");

var _CreateProfile = require("../../service/CreateProfile");

var _CreateUserService = require("../../service/CreateUserService");

var _DeleteUserService = require("../../service/DeleteUserService");

var _findUserByIdService = require("../../service/findUserByIdService");

var _GlobalPontsService = require("../../service/GlobalPontsService");

var _ListAllUsers = require("../../service/ListAllUsers");

var _SessionService = require("../../service/SessionService.service");

var _tsyringe = require("tsyringe");

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class UserController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_CreateUserService.CreateUserService);

    const {
      nome,
      membro,
      senha,
      adm,
      id,
      apadrinhado,
      firstLogin,
      inativo
    } = req.body;
    const user = await service.execute({
      nome,
      membro,
      senha,
      adm,
      id,
      apadrinhado,
      firstLogin,
      inativo
    });
    console.log(firstLogin);
    return res.json(user);
  }

  async session(req, res) {
    const service = _tsyringe.container.resolve(_SessionService.SessionService);

    const {
      membro,
      senha
    } = req.body;
    const sess = await service.execute({
      membro,
      senha
    });
    return res.json(sess);
  }

  async deleteUser(req, res) {
    const serv = _tsyringe.container.resolve(_DeleteUserService.DeleteUserService);

    const {
      membro
    } = req.params;
    const rs = await serv.execute({
      membro
    });
    return res.json(rs);
  }

  async findUserById(req, res) {
    const serv = _tsyringe.container.resolve(_findUserByIdService.findUserByIdService);

    const {
      id
    } = req.user;
    const rs = await serv.execute({
      user_id: id
    });
    return res.json(rs);
  } // async update(req: Request, res: Response): Promise<Response> {}
  // async updateAvatar(req: Request, res: Response): Promise<Response> {}
  // async updateLogo(req: Request, res: Response): Promise<Response> {}


  async listAll(req, res) {
    const service = _tsyringe.container.resolve(_ListAllUsers.ListAllUser);

    const list = await service.execute();
    return res.json(list);
  } // ! PROFILE */


  async createProfile(req, res) {
    const serv = _tsyringe.container.resolve(_CreateProfile.CreateProfi);

    const {
      whats,
      workName,
      CNPJ,
      CPF,
      email,
      enquadramento,
      ramo,
      logo,
      avatar
    } = req.body;
    const user_id = req.user.id;
    const create = await serv.execute({
      whats,
      workName,
      CNPJ,
      CPF,
      email,
      enquadramento,
      ramo,
      fk_id_user: user_id,
      logo,
      avatar
    });
    return res.json(create);
  } // !! LINKS


  async createLink(req, res) {
    const service = _tsyringe.container.resolve(_createLink.CreateLink);

    const {
      nome,
      user_id,
      link
    } = req.body;
    const user = await service.execute({
      nome,
      user_id,
      link
    });
    return res.json(user);
  } //! RANK GERAL


  async rank(req, res) {
    const serv = _tsyringe.container.resolve(_GlobalPontsService.GlobalPontsService);

    const ex = await serv.execute();
    return res.json(ex);
  } // async findUnicUser(req: Request, res: Response): Promise<Response> {}
  // async updateToken(req: Request, res: Response): Promise<Response> {}
  // async updatePadrinho(req: Request, res: Response): Promise<Response> {}
  // async updateSenhaUser(req: Request, res: Response): Promise<Response> {}


}

exports.UserController = UserController;