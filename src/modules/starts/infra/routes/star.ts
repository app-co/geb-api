import { Auth } from '@shared/midle/Auth';
import { Router } from 'express';

import { StarController } from '../controller';

const star = Router();
const controler = new StarController();

star.use(Auth);
star.post('/assest', controler.create);

export { star };
