"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresensaController = void 0;

var _CreateOrderPresençaService = require("../../services/CreateOrderPresen\xE7aService");

var _CreatePresensaService = require("../../services/CreatePresensaService");

var _DeletePresenca = require("../../services/DeletePresenca");

var _GlobalPontsPresencaService = require("../../services/GlobalPontsPresencaService");

var _ListAllOrderPresencaService = require("../../services/ListAllOrderPresencaService");

var _ListPresencaUserService = require("../../services/ListPresencaUserService");

var _tsyringe = require("tsyringe");

class PresensaController {
  async create(req, res) {
    const service = _tsyringe.container.resolve(_CreatePresensaService.CreatePresencaService);

    const {
      user_id,
      nome,
      presenca
    } = req.body;
    const create = await service.execute({
      user_id,
      nome,
      presenca
    });
    return res.json(create);
  }

  async createOrder(req, res) {
    const service = _tsyringe.container.resolve(_CreateOrderPresençaService.CreateOrderPresencaService);

    const {
      user_id,
      nome
    } = req.body;
    const create = await service.execute({
      user_id,
      nome
    });
    return res.json(create);
  }

  async delte(req, res) {
    const service = _tsyringe.container.resolve(_DeletePresenca.DeletePresensa);

    const {
      id
    } = req.params;
    const create = await service.execute({
      id: String(id)
    });
    return res.json(create);
  } // async update(req: Request, res: Response): Promise<Response> {}


  async listAllOrder(req, res) {
    const service = _tsyringe.container.resolve(_ListAllOrderPresencaService.ListAllOrderPresensaService);

    const list = await service.execute();
    return res.json(list);
  }

  async listAllPresecaUser(req, res) {
    const service = _tsyringe.container.resolve(_ListPresencaUserService.ListPresencaUseraService);

    const user_id = req.user.id;
    const list = await service.execute({
      user_id
    });
    return res.json(list);
  }

  async rank(req, res) {
    const service = _tsyringe.container.resolve(_GlobalPontsPresencaService.GlobalPontsPresencaService);

    const list = await service.execute();
    return res.json(list);
  } // async rank(req: Request, res: Response): Promise<Response> {}
  // async rank(req: Request, res: Response): Promise<Response> {}
  // async rank(req: Request, res: Response): Promise<Response> {}


}

exports.PresensaController = PresensaController;