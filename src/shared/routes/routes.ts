import { reletionShipRoutes } from '@/modules/relationShip/routes';
import { userAutRoute } from '@/modules/user/aut.routes';
import { userRoute } from '@/modules/user/routes';
import { FastifyInstance, RawServerDefault } from 'fastify';


export async function Routes(app: FastifyInstance) {
  app.register(userRoute);
  app.register(userAutRoute)
  app.register(reletionShipRoutes)
}

