import { CreateStar } from '@modules/starts/services/createStar';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class StarController {
   async create(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(CreateStar);

      const { fk_id_user, star } = req.body;
      const valiador = req.user.id;

      const create = await serv.execute({
         fk_id_user,
         star,
         valiador,
      });

      return res.json(create);
   }

   async list(req: Request, res: Response): Promise<Response> {}
}
