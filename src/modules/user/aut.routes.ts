import { FastifyInstance } from 'fastify';
import { Controller } from './controller'
import { Auth } from '@/shared/middlewares/verify-jwt';

const controler = new Controller()

export async function userAutRoute(app: FastifyInstance) {
  app.addHook('onRequest', Auth)

  app.get('/user', controler.byId);
  app.get('/users', controler.getAll);
  app.get('/user/hub', controler.byHub);

  app.put('/user', controler.updateUser);
  app.put('/user/profile', controler.updateProfile);

  app.post('/user/profile', controler.registerProfile);

  app.delete('/user/:id', controler.delete);
}
