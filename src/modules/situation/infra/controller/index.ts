import { UpdateSituationService } from '@modules/situation/services/updateSituation';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class SituationController {
   async update(req: Request, res: Response): Promise<Response> {
      const serv = container.resolve(UpdateSituationService);

      const { apadrinhado, firstLogin, fk_id_user, inativo, logado } = req.body;

      const create = await serv.execute({
         apadrinhado,
         firstLogin,
         fk_id_user,
         inativo,
         logado,
      });
      return res.json(create);
   }
}
