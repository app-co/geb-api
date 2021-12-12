import { CreateConsumoConsumidorService } from '@modules/consumo/services/CreateConsumoConsumidor';
import { ListValorPrestadorConsumoService } from '@modules/consumo/services/ListValorPrestadorConsumoService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateConsumoPrestadorService } from '../../services/CreateConsumoPrestadorService.service';
import { ListConsumoService } from '../../services/ListConsumoService.service';
import { ListValorConsumoService } from '../../services/ListValorConsumoService';

export class ConsumoController {
   async createPrestador(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreateConsumoPrestadorService);

      const { descricao, type, valor } = req.body;
      const prestador_id = req.user.id;

      const consumo = await service.execute({
         prestador_id,
         descricao,
         type,
         valor,
      });

      return res.json(consumo);
   }

   async createConsumidor(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreateConsumoConsumidorService);

      const { consumidor_id, descricao, type, valor } = req.body;

      const consumo = await service.execute({
         consumidor_id,
         descricao,
         type,
         valor,
      });

      return res.json(consumo);
   }

   async listAll(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListConsumoService);

      const consumo = await service.execute();

      return res.json(consumo);
   }

   async listValorP(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListValorPrestadorConsumoService);

      const consumo = await service.execute();

      return res.json(consumo);
   }

   async listValorC(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListValorConsumoService);

      const consumo = await service.execute();

      return res.json(consumo);
   }
}
