import { makeRelationship } from '@modules/relationship/service/factories';
import { Request, Response } from 'express';
import { z } from 'zod';

export class RelationshipController {
   async create(req: Request, res: Response): Promise<Response> {
      const scheme = z.object({
         situation: z.boolean().default(false),
         prestador_id: z.string(),
         ponts: z.number(),
         type: z
            .enum([
               'B2B',
               'CONSUMO_IN',
               'CONSUMO_OUT',
               'APADRINAHMENTO',
               'INDICATION',
               'DONATE',
               'INVIT',
            ])
            .default('CONSUMO_OUT'),
      });

      const { id } = req.user;
      const data = scheme.parse(req.body);
      const { objto } = req.body;

      const dt = {
         ...data,
         fk_user_id: id,
         objto,
      };

      try {
         const make = makeRelationship();

         const create = await make.create(dt);

         return res.json(create);
      } catch (error) {
         console.log(error);
         return res.send(error);
      }
   }

   async update(req: Request, res: Response): Promise<Response> {
      const scheme = z.object({
         id: z.string(),
         situation: z.boolean().default(true),
      });

      const data = scheme.parse(req.body);
      const { id } = req.user;

      const dt = {
         ...data,
         prestador_id: id,
      };

      try {
         const make = makeRelationship();

         const create = await make.update(dt);

         return res.json(create);
      } catch (error) {
         return res.send(error);
      }
   }

   async listAll(req: Request, res: Response): Promise<Response> {
      try {
         const make = makeRelationship();

         const create = await make.listAll();

         return res.json(create);
      } catch (error) {
         return res.send(error);
      }
   }

   async listByClient(req: Request, res: Response): Promise<Response> {
      try {
         const make = makeRelationship();
         const { id } = req.user;

         const create = await make.listByClient(id);

         return res.json(create);
      } catch (error) {
         return res.send(error);
      }
   }

   async listByPrestador(req: Request, res: Response): Promise<Response> {
      const { id } = req.user;
      try {
         const make = makeRelationship();

         const create = await make.listByPrestador(id);

         return res.json(create);
      } catch (error) {
         return res.send(error);
      }
   }

   async delete(req: Request, res: Response): Promise<Response> {
      const scheme = z.object({
         id: z.string(),
      });

      const { id } = scheme.parse(req.params);
      try {
         const make = makeRelationship();

         const create = await make.delete(id);

         return res.json(create);
      } catch (error) {
         return res.send(error);
      }
   }

   async data(req: Request, res: Response): Promise<Response> {
      try {
         const make = makeRelationship();

         const create = await make.data();

         return res.json(create);
      } catch (error) {
         console.log(error);
         return res.send(error);
      }
   }
}
