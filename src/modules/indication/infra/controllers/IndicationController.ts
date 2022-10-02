import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateIndicationService } from '../services/CreateIndicationService';
import { DeleteIndicationService } from '../services/delteIndication';
import { ListAllIndication } from '../services/ListAllIndication';
import { ListByIndicado } from '../services/ListByIndicado';
import { ListByWhoIndService } from '../services/ListByWhoIndService';
import { PontosIndication } from '../services/PontosIndication';
import { ValidateIndicationService } from '../services/ValidateIndication';

export class IndicationController {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreateIndicationService);
      const {
         indicado_id,
         quemIndicou_name,
         indicado_name,
         quemIndicou_id,
         client_name,
         description,
         phone_number_client,
      } = req.body;

      const create = await service.execute({
         indicado_id,
         client_name,
         description,
         phone_number_client,
         quemIndicou_id,
         indicado_name,
         quemIndicou_name,
      });

      return res.json(create);
   }

   async validate(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ValidateIndicationService);
      const { indication_id } = req.body;
      const indicado_id = req.user.id;

      const create = await service.execute({
         indication_id,
         indicado_id,
      });

      return res.json(create);
   }

   async listAll(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListAllIndication);

      const list = await service.execute();

      return res.json(list);
   }

   async pontos(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(PontosIndication);

      const list = await service.execute();

      return res.json(list);
   }

   async listIndicado(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListByIndicado);
      const { id } = req.user;
      const list = await service.execute(id);

      return res.json(list);
   }

   async quemInd(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListByWhoIndService);
      const { id } = req.user;
      const list = await service.execute(id);

      return res.json(list);
   }

   async del(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(DeleteIndicationService);
      const { id } = req.params;
      const list = await service.execute(id);

      return res.json(list);
   }
}
