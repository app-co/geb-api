import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { links } from './links';

const LinksRoute = Router();

LinksRoute.use(Auth);

LinksRoute.use('/links', links);

export { LinksRoute };
