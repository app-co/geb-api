"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = void 0;

var _createLink = require("../../service/createLink");

var _CreateUserService = require("../../service/CreateUserService");

var _DeleteUserService = require("../../service/DeleteUserService");

var _findUserByIdService = require("../../service/findUserByIdService");

var _ListAllUsers = require("../../service/ListAllUsers");

var _createPadrinhoService = require("../../service/Padrinho/createPadrinhoService");

var _GlobalPontsService = require("../../service/Pontos/GlobalPontsService");

var _IndividualPontsService = require("../../service/Pontos/IndividualPontsService");

var _CreateProfile = require("../../service/Profile/CreateProfile");

var _UpdateProfileService = require("../../service/Profile/UpdateProfileService");

var _SessionService = require("../../service/SessionService.service");

var _tsyringe = require("tsyringe");

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class UserController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_CreateUserService.CreateUserService);

    const {
      nome,
      qntIndication,
      qntPadrinho,
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
      inativo,
      qntIndication,
      qntPadrinho
    });
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
      avatar,
      fk_id_user
    } = req.body; // const user_id = req.user.id;

    const create = await serv.execute({
      whats,
      workName,
      CNPJ,
      CPF,
      email,
      enquadramento,
      ramo,
      fk_id_user,
      logo,
      avatar
    });
    return res.json(create);
  }

  async updateProfile(req, res) {
    const serv = _tsyringe.container.resolve(_UpdateProfileService.UpdateProfileService);

    const {
      whats,
      workName,
      CNPJ,
      CPF,
      email,
      enquadramento,
      ramo,
      logo,
      avatar,
      fk_id_user
    } = req.body; // const user_id = req.user.id;

    const create = await serv.execute({
      whats,
      workName,
      CNPJ,
      CPF,
      email,
      enquadramento,
      ramo,
      fk_id_user,
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
  } //! pntos


  async rank(req, res) {
    const serv = _tsyringe.container.resolve(_GlobalPontsService.GlobalPontsService);

    const ex = await serv.execute();
    return res.json(ex);
  }

  async rankIndividual(req, res) {
    const serv = _tsyringe.container.resolve(_IndividualPontsService.IndicifualPontsService);

    const user_id = req.user.id;
    const ex = await serv.execute(user_id);
    return res.json(ex);
  } //! ! PADRINNHO


  async createPadrinho(req, res) {
    const serv = _tsyringe.container.resolve(_createPadrinhoService.CreatePadrinhoService);

    const {
      apadrinhado_name,
      apadrinhado_id,
      qnt
    } = req.body;
    const user_id = req.user.id;
    const ex = await serv.execute({
      user_id,
      apadrinhado_name,
      apadrinhado_id,
      qnt
    });
    return res.json(ex);
  } // async findUnicUser(req: Request, res: Response): Promise<Response> {}
  // async updateToken(req: Request, res: Response): Promise<Response> {}
  // async updatePadrinho(req: Request, res: Response): Promise<Response> {}
  // async updateSenhaUser(req: Request, res: Response): Promise<Response> {}


}

exports.UserController = UserController;