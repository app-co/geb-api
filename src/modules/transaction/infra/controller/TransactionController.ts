import { FindTransactionById } from '@modules/transaction/service/FindTransactionById';
import { ListAllTransaction } from '@modules/transaction/service/ListAllTransaction';
import { ListByPrestador } from '@modules/transaction/service/ListByPrestador';
import { ListByConsumidor } from '@modules/transaction/service/LitByConsumidor';
import { PontosTransaction } from '@modules/transaction/service/PontosTransaction';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteTransactionService } from '../../service/DeleteTransactionService';
import { ValidateOrderTransactionService } from '../../service/ValidateOrderTransactionService';

export class TransactionControler {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ValidateOrderTransactionService);
      const {
         consumidor_id,
         consumidor_name,
         prestador_name,
         prestador_id,
         valor,
         descricao,
         order_id,
      } = req.body;
      const user_id = req.user.id;

      const create = await service.execute({
         consumidor_id,
         consumidor_name,
         prestador_name,
         prestador_id,
         valor,
         descricao,
         user_id,
         order_id,
      });

      // req.io.emit('trans', create);

      return res.json(create);
   }

   async findById(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(FindTransactionById);
      const { id } = req.params;
      const find = await service.execute({ id });

      return res.json(find);
   }

   async listAll(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListAllTransaction);
      const find = await service.execute();

      return res.json(find);
   }

   async findByPrestador(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListByPrestador);
      const { id } = req.user;
      const find = await service.execute({ id });

      return res.json(find);
   }

   async findByConsumidor(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListByConsumidor);
      const { id } = req.user;
      const find = await service.execute({ id });

      return res.json(find);
   }

   async del(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(DeleteTransactionService);
      const { id } = req.params;
      const find = await service.execute({ id: String(id) });

      return res.json(find);
   }

   async pontos(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(PontosTransaction);
      const find = await service.exec();

      return res.json(find);
   }
}
