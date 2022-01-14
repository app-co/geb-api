import { ClassificationPresensa } from '@modules/presensa/services/ClassificationPresensa';
import { CreatePresencaService } from '@modules/presensa/services/CreatePresensaService';
import { ListAllPresensaService } from '@modules/presensa/services/ListAllPresensaService';
import { UpdatePresensaService } from '@modules/presensa/services/UdatePresensaService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPresensaService } from '../../services/ListPresensaService';

export class PresensaController {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreatePresencaService);
      const { user_id } = req.body;

      const create = await service.execute({
         user_id,
      });

      return res.json(create);
   }

   async update(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(UpdatePresensaService);
      const { id, presenca } = req.body;

      const create = await service.execute({ id, presenca });

      return res.json(create);
   }

   async list(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListPresensaService);
      const user_id = req.user.id;

      const list = await service.execute(user_id);

      return res.json(list);
   }

   async listAll(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListAllPresensaService);
      const list = await service.execute();

      return res.json(list);
   }

   async rank(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ClassificationPresensa);
      const list = await service.execute();

      return res.json(list);
   }
}
