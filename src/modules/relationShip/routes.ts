import { FastifyInstance } from 'fastify';
import { Controller } from './controller'
import { Auth } from '@/shared/middlewares/verify-jwt';

const controler = new Controller()

export async function reletionShipRoutes(app: FastifyInstance) {
  app.addHook('onRequest', Auth)

  app.post('/relationShip/register', controler.register);

  app.get('/relationShip/all', controler.all);
  app.get('/relationShip/byUser', controler.byUser)
  app.get('/relationShip/byReceptor', controler.byReceptor)
  app.get('/relationShip/podiun', controler.podiun);
  app.get('/relationShip/aprovation', controler.relationForAprovation);
  app.get('/relationShip/notValides/:type', controler.notValides);

  app.put('/relationShip/:id', controler.validate);
  app.delete('/relationShip/:id', controler.delete)
}