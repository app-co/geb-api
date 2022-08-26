import { Router } from 'express';

import { b2b } from './B2bRouter';

const b2bRoute = Router();

b2bRoute.use('/b2b', b2b);

export { b2bRoute };
