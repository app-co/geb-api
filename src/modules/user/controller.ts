import { FastifyReply, FastifyRequest } from 'fastify';
import { make } from './make';
import { validation } from '@/dto/validations';

const service = make()

export class Controller {
  async register(req: FastifyRequest, res: FastifyReply) {
    const schema = validation.user.omit({ id: true }).parse(req.body)

    const rs = await service.create(schema);

    return res.status(201).send(rs);
  }

  async byId(req: FastifyRequest, res: FastifyReply) {
    const userId = req.user.sub
    const rs = await service.getUserById(userId);

    return res.status(201).send(rs);
  }

  async byHub(req: FastifyRequest, res: FastifyReply) {

    const hub = validation.usersByHub.parse({
      ...req.query,
      userId: req.user.sub,
    })
    const rs = await service.userByHub(hub);

    return res.status(201).send(rs);
  }

  async getAll(req: FastifyRequest, res: FastifyReply) {
    const userId = req.user.sub
    const rs = await service.listAll(userId);

    return res.status(201).send(rs);
  }

  async registerProfile(req: FastifyRequest, res: FastifyReply) {
    const obj = validation.profile.omit({ id: true }).parse(req.body);

    const rs = await service.registerProfile(obj);

    return res.status(201).send(rs);
  }

  async updateUser(req: FastifyRequest, res: FastifyReply) {
    const obj = validation.user.parse(req.body);

    const rs = await service.updateUser(obj);

    return res.status(201).send(rs);
  }
  async updateProfile(req: FastifyRequest, res: FastifyReply) {
    const obj = validation.profile.parse({
      ...req.body as any,
      userId: req.user.sub,
    });

    const rs = await service.updateProfile(obj);

    return res.status(201).send(rs);
  }

  async delete(req: FastifyRequest, res: FastifyReply) {
    const { id } = req.params as { id: string }

    console.log({ userId: id })

    const rs = await service.deleteUser(id);

    return res.status(201).send(rs);
  }

  async session(req: FastifyRequest, res: FastifyReply): Promise<Response> {
    const data = validation.session.parse(req.body);

    const user = await service.session(data);

    const token = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );

    const refleshToken = await res.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    );

    const dt = {
      token,
    };

    return res
      .setCookie('refresh', refleshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .send(dt)
      .status(201);
  }

  async sincro(req: FastifyRequest, res: FastifyReply) {

    const rs = await service.sincron();

    return res.status(201).send(rs);
  }

  async star(req: FastifyRequest, res: FastifyReply) {
    const { userId, star } = req.body as { userId: string, star: number };

    const rs = await service.star(userId, star);

    return res.status(201).send(rs);
  }


  async midia(req: FastifyRequest, res: FastifyReply) {
    const obj = validation.midia.parse(req.body);

    const rs = await service.registerMidia(obj);

    return res.status(201).send(rs);
  }

}