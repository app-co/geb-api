import { CreateOrderTransaction } from '@modules/consumo/services/CreateOrderTransaction';
import { DeleteOrderService } from '@modules/consumo/services/DeleteOrderService';
import { FindOrderConsumidor } from '@modules/consumo/services/FindOrderConsumidor';
import { FindOrderPrestador } from '@modules/consumo/services/FindOrderPrestador';
import { ListAllOrderService } from '@modules/consumo/services/ListAllOrderService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ConsumoController {
   async createOrder(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreateOrderTransaction);

      const {
         descricao,
         consumidor_id,
         consumidor_name,
         prestador_name,
         valor,
         prestador_id,
      } = req.body;

      const consumo = await service.execute({
         consumidor_id,
         prestador_id,
         descricao,
         valor,
         consumidor_name,
         prestador_name,
      });

      await req.io.emit('order-trans', consumo);

      return res.json(consumo);
   }

   async findOrderPrestador(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(FindOrderPrestador);

      const prestador_id = req.user.id;

      const find = await service.execute(prestador_id);

      return res.json(find);
   }

   async findOrderConsumidor(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(FindOrderConsumidor);

      const consumidor_id = req.user.id;

      const find = await service.execute(consumidor_id);

      return res.json(find);
   }

   async findAllOrder(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(ListAllOrderService);

      const find = await serv.execute();

      return res.json(find);
   }

   async deleteOrder(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(DeleteOrderService);
      const { id } = req.params;

      const find = await serv.execute({ id: String(id) });

      return res.json(find);
   }

   // async listValorP(req: Request, res: Response): Promise<Response> {}

   // async listValorC(req: Request, res: Response): Promise<Response> {}
}
