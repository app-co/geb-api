import { Router } from 'express';

import { situation } from './situationRoute';

const situationRoute = Router();

situationRoute.use('/situation', situation);

export { situationRoute };
