import { Router } from 'express';

import { RoutePresensa } from './routePresensa.routes';

const PresensaRoute = Router();

PresensaRoute.use('/presenca', RoutePresensa);

export { PresensaRoute };
