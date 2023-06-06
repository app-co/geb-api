/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { donalte } from '@modules/Donate/services/donalte';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class DonateController {
   async create(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(donalte);

      const { itens } = req.body;

      const fk_id_user = req.user.id;

      const create = await service.create({ itens, fk_id_user });

      return res.json(create);
   }

   async listMany(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(donalte);

      const list = await service.listMany();

      return res.json(list);
   }

   async findById(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(donalte);
      const id = req.params;

      const list = await service.findById(String(id));

      return res.json(list);
   }

   async delete(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(donalte);
      const { id } = req.params;

      const list = await service.delete({ id: String(id) });

      return res.json(list);
   }

   async approved(req: Request, res: Response): Promise<Response> {
      const service = container.resolve(donalte);
      const { id } = req.params;

      const list = await service.validate({ id: String(id) });

      return res.json(list);
   }
}
