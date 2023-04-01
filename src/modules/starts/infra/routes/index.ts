import { Router } from 'express';

import { star } from './star';

const RouteStar = Router();

RouteStar.use('/star', star);

export { RouteStar };
