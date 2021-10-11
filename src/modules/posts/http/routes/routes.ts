import { Router } from 'express';

import { post } from './post.routes';

const postRoute = Router();

postRoute.use('/post', post);

export { postRoute };
