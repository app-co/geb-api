import { Router } from 'express';

import { user } from './user.routes';

const UserRoute = Router();

UserRoute.use('/user', user);

export { UserRoute };
