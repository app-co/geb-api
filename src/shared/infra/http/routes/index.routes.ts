import { Router } from 'express';

import { routes } from './routes';

const Route = Router();

Route.use(routes);

export { Route };
