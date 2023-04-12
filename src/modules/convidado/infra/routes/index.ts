import { Router } from 'express';

import { guest } from './guestRoute';

const routeGuest = Router();

routeGuest.use('/guest', guest);

export { routeGuest };
