import { Router } from 'express';

import { LinksController } from '../controller/LinksController';

const links = Router();
const control = new LinksController();

links.post('/create-links', control.create);
links.get('/', control.listMany);

export { links };
