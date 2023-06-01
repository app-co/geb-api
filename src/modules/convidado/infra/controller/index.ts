import { CreateConvidadoService } from '@modules/convidado/services/createConvidadoService';
import { ListAllConvidadoService } from '@modules/convidado/services/ListAllConvidadoService';
import { UpdateConvidadoService } from '@modules/convidado/services/updateConvidadoService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ConvidadoController {
   async create(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(CreateConvidadoService);

      const fk_user_id = req.user.id;

      const { name_convidado } = req.body;

      const create = await serv.execute({
         fk_user_id,
         name_convidado,
      });

      return res.json(create);
   }

   async listAll(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(ListAllConvidadoService);

      const list = await serv.exec();

      return res.json(list);
   }

   async update(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(UpdateConvidadoService);
      const { id, approved } = req.body;

      const list = await serv.exec(id, approved);

      return res.json(list);
   }
}
