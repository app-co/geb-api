"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserController = void 0;

var _clearCacheService = require("../../service/clearCacheService");

var _createLink = require("../../service/createLink");

var _CreateUserService = require("../../service/CreateUserService");

var _DeleteUserService = require("../../service/DeleteUserService");

var _findUserByIdService = require("../../service/findUserByIdService");

var _ListAllUsers = require("../../service/ListAllUsers");

var _createPadrinhoService = require("../../service/Padrinho/createPadrinhoService");

var _GlobalPontsService = require("../../service/Pontos/GlobalPontsService");

var _IndividualPontsService = require("../../service/Pontos/IndividualPontsService");

var _CreateProfile = require("../../service/Profile/CreateProfile");

var _UpdateLogo = require("../../service/Profile/UpdateLogo");

var _UpdateProfileService = require("../../service/Profile/UpdateProfileService");

var _SessionService = require("../../service/SessionService.service");

var _UpdateMembroService = require("../../service/UpdateMembroService");

var _UpdatePass = require("../../service/UpdatePass");

var _tsyringe = require("tsyringe");

var _UpdateAvatar = require("../../service/Profile/UpdateAvatar");

/* eslint-disable @typescript-eslint/no-non-null-assertion */
class UserController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_CreateUserService.CreateUserService);

    const {
      nome,
      membro,
      senha,
      adm,
      apadrinhado,
      firstLogin,
      inativo
    } = req.body;
    const user = await service.execute({
      nome,
      membro,
      senha,
      adm,
      apadrinhado,
      firstLogin,
      inativo
    });
    return res.json(user);
  }

  async updateMembro(req, res) {
    const service = _tsyringe.container.resolve(_UpdateMembroService.UpdateMembroService);

    const {
      membro,
      nome,
      id,
      senha,
      token,
      adm
    } = req.body;
    const sess = await service.execute({
      membro,
      senha,
      nome,
      id,
      adm,
      token
    });
    return res.json(sess);
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
  }

  async updateSenha(req, res) {
    const serv = _tsyringe.container.resolve(_UpdatePass.UpdateSenha);

    const {
      membro,
      senha
    } = req.body;
    const rs = await serv.execute({
      membro,
      senha
    });
    return res.json(rs);
  } // async updateAvatar(req: Request, res: Response): Promise<Response> {}
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
  }

  async updateAvatar(req, res) {
    const serv = _tsyringe.container.resolve(_UpdateAvatar.UpdateAvatar);

    const avatar = req.file.filename;
    const {
      id
    } = req.user;
    const create = await serv.execute(id, avatar);
    return res.json(create);
  }

  async updateLogo(req, res) {
    const serv = _tsyringe.container.resolve(_UpdateLogo.UpdateLogo);

    const logo = req.file.filename;
    const {
      id
    } = req.user;
    const create = await serv.execute(id, logo);
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
  }

  async clearCash(req, res) {
    const service = _tsyringe.container.resolve(_clearCacheService.clearCacheService);

    const rs = await service.execute();
    return res.json(rs);
  } // async updateToken(req: Request, res: Response): Promise<Response> {}
  // async updatePadrinho(req: Request, res: Response): Promise<Response> {}
  // async updateSenhaUser(req: Request, res: Response): Promise<Response> {}


}

exports.UserController = UserController;