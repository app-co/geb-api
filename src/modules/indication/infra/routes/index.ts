import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { ind } from './indication';

const IndicationRoute = Router();
IndicationRoute.use('/indication', Auth, ind);

export { IndicationRoute };
