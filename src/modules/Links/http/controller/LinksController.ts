/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createLinks } from '@modules/Links/services/createLinks';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class LinksController {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(createLinks);

      const { nome, link } = req.body;
      const { id } = req.user;

      const create = await service.create({
         nome,
         link,
         fk_user_id: id,
      });

      return res.json(create);
   }

   async listMany(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(createLinks);

      const user_id = req.user.id;

      const list = await service.listMany(user_id);

      return res.json(list);
   }
}
