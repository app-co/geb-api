"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConsumoController = void 0;

var _CreateOrderTransaction = require("../../services/CreateOrderTransaction");

var _DeleteOrderService = require("../../services/DeleteOrderService");

var _FindOrderConsumidor = require("../../services/FindOrderConsumidor");

var _FindOrderPrestador = require("../../services/FindOrderPrestador");

var _ListAllOrderService = require("../../services/ListAllOrderService");

var _tsyringe = require("tsyringe");

class ConsumoController {
  async createOrder(req, res) {
    const service = _tsyringe.container.resolve(_CreateOrderTransaction.CreateOrderTransaction);

    const {
      descricao,
      consumidor_id,
      consumidor_name,
      prestador_name,
      valor,
      prestador_id
    } = req.body;
    const consumo = await service.execute({
      consumidor_id,
      prestador_id,
      descricao,
      valor,
      consumidor_name,
      prestador_name
    });
    await req.io.emit('order-trans', consumo);
    return res.json(consumo);
  }

  async findOrderPrestador(req, res) {
    const service = _tsyringe.container.resolve(_FindOrderPrestador.FindOrderPrestador);

    const prestador_id = req.user.id;
    const find = await service.execute(prestador_id);
    return res.json(find);
  }

  async findOrderConsumidor(req, res) {
    const service = _tsyringe.container.resolve(_FindOrderConsumidor.FindOrderConsumidor);

    const consumidor_id = req.user.id;
    const find = await service.execute(consumidor_id);
    return res.json(find);
  }

  async findAllOrder(req, res) {
    const serv = _tsyringe.container.resolve(_ListAllOrderService.ListAllOrderService);

    const find = await serv.execute();
    return res.json(find);
  }

  async deleteOrder(req, res) {
    const serv = _tsyringe.container.resolve(_DeleteOrderService.DeleteOrderService);

    const {
      id
    } = req.params;
    const find = await serv.execute({
      id: String(id)
    });
    return res.json(find);
  } // async listValorP(req: Request, res: Response): Promise<Response> {}
  // async listValorC(req: Request, res: Response): Promise<Response> {}


}

exports.ConsumoController = ConsumoController;