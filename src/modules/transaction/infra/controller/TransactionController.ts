import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateTransactionService } from '../../service/CreateTransactionService';
import { DeleteTransactionService } from '../../service/DeleteTransactionService';
import { ListTransactionService } from '../../service/LIstTransactionService';

export class TransactionControler {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreateTransactionService);
      const { prestador_id, consumidor_id, valor, descricao, nome } = req.body;

      const create = await service.execute({
         prestador_id,
         consumidor_id,
         valor,
         descricao,
         nome,
      });

      req.io.emit('trans', create);

      return res.json(create);
   }

   async find(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListTransactionService);
      const { id } = req.user;
      const find = await service.execute({ id });

      return res.json(find);
   }

   async del(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(DeleteTransactionService);
      const { id } = req.params;
      const find = await service.execute(String(id));

      return res.json(find);
   }
}
