import { postRoute } from '@modules/posts/http/routes/routes';
import { UserRoute } from '@modules/users/infra/routes/routes';
import { Router } from 'express';

const routes = Router();

routes.use(UserRoute);
routes.use(postRoute);

export { routes };
