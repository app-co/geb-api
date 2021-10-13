import { ListConsumoService } from '@modules/consumo/services/ListConsumoService.service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateConsumoService } from '../../services/CreateConsumoService.service';

export class ConsumoController {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreateConsumoService);

      const { prestador_id, descricao, type, valor } = req.body;
      const consumidor_id = req.user.id;

      const consumo = await service.execute({
         prestador_id,
         descricao,
         type,
         valor,
         consumidor_id,
      });

      return res.json(consumo);
   }

   async list(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListConsumoService);

      const user_id = req.user.id;

      const consumo = await service.execute({ user_id });

      return res.json(consumo);
   }
}
