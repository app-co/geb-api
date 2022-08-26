import { CreateB2b } from '@modules/B2b/services/CreateB2bService';
import { FindB2bBySendId } from '@modules/B2b/services/FindB2bBySendId';
import { ListAllB2b } from '@modules/B2b/services/ListAllB2b';
import { PontosB2b } from '@modules/B2b/services/PontosB2b';
import { ValidateB2b } from '@modules/B2b/services/ValiidateB2b';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteB2b } from '../../services/DeleteB2b';
import { FindB2bByRecevid } from '../../services/FindB2bByRecevid';

export class B2bController {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(CreateB2b);
      const { recevid_id, appointment } = req.body;
      const user_id = req.user.id;

      const create = await service.execute({
         send_id: user_id,
         recevid_id,
         appointment,
      });

      req.io.emit('trans', create);

      return res.json(create);
   }

   async listAll(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ListAllB2b);

      const create = await service.execute();

      return res.json(create);
   }

   async findBySend(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(FindB2bBySendId);
      const { id } = req.user;

      const create = await service.execute(id);

      return res.json(create);
   }

   async findByRecevid(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(FindB2bByRecevid);
      const { id } = req.user;

      const create = await service.execute(id);

      return res.json(create);
   }

   async validate(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(ValidateB2b);
      const { id } = req.body;

      const user_id = req.user.id;

      const create = await service.execute(id, user_id);

      return res.json(create);
   }

   async delete(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(DeleteB2b);
      const { id } = req.params;

      const create = await service.execute(id);

      return res.json(create);
   }

   async pontos(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(PontosB2b);

      const create = await service.exec();

      return res.json(create);
   }
}
