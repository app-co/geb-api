import { ConsumoRoute } from '@modules/consumo/infra/routes/index.routes';
import { postRoute } from '@modules/posts/http/routes/routes';
import { TransactionRoute } from '@modules/transaction/infra/routes/routes.routes';
import { UserRoute } from '@modules/users/infra/routes/routes';
import { Router } from 'express';

const routes = Router();

routes.use(UserRoute);
routes.use(postRoute);
routes.use(ConsumoRoute);
routes.use(TransactionRoute);

export { routes };
