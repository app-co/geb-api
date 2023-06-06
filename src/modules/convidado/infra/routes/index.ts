import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { guest } from './guestRoute';

const routeGuest = Router();

routeGuest.use(Auth);

routeGuest.use('/guest', guest);

export { routeGuest };
