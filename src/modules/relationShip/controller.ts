import { FastifyReply, FastifyRequest } from 'fastify';

import { validation } from '@/dto/validations';

import { make } from './make';

const service = make();

export class Controller {
  async register(req: FastifyRequest, res: FastifyReply) {
    const schema = validation.relationships
      .omit({ avatar: true, id: true })
      .parse({
        ...(req.body as any),
        userId: req.user.sub,
      });
    const rs = await service.register(schema);

    return res.status(201).send(rs);
  }

  async all(req: FastifyRequest, res: FastifyReply) {
    const rs = await service.all();

    return res.status(201).send(rs);
  }

  async byUser(req: FastifyRequest, res: FastifyReply) {
    const userId = req.user.sub;
    const rs = await service.byUser(userId);

    return res.status(201).send(rs);
  }

  async byReceptor(req: FastifyRequest, res: FastifyReply) {
    const receptorId = req.user.sub;
    const rs = await service.byReceptor(receptorId);

    return res.status(201).send(rs);
  }

  async relationForAprovation(req: FastifyRequest, res: FastifyReply) {
    const userId = req.user.sub;
    const rs = await service.relationForAprovation(userId);

    return res.status(201).send(rs);
  }

  async validate(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string };

    await service.validate(Number(id));

    return res.status(201).send('ok');
  }

  async podiun(req: FastifyRequest, res: FastifyReply) {
    const userId = req.user.sub;
    const rs = await service.podiun(userId);

    return res.status(201).send(rs);
  }

  async notValides(req: FastifyRequest, res: FastifyReply) {
    const { type } = req.params as { type: string };
    const rs = await service.notValides(Number(type));

    return res.status(201).send(rs);
  }

  async delete(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string };
    await service.deleteRealation(Number(id));

    return res.status(201).send('ok');
  }

  async metrica(req: FastifyRequest, res: FastifyReply) {
    const userId = req.user.sub;
    const rs = await service.metricasUser(userId);

    return res.status(201).send(rs);
  }
}
