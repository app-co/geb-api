import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { MetricController } from './controller';

const metricRoute = Router();
const controler = new MetricController();

metricRoute.get('/metric/user', Auth, controler.user);

metricRoute.get('/metric', Auth, controler.global);

export { metricRoute };
