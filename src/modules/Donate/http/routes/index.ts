import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { donate } from './donate';

const DonateRoute = Router();

DonateRoute.use(Auth);

DonateRoute.use('/donate', donate);

export { DonateRoute };
