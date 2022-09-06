import { b2bRoute } from '@modules/B2b/infra/routes';
import { ConsumoRoute } from '@modules/consumo/infra/routes/index.routes';
import { IndicationRoute } from '@modules/indication/infra/routes';
import { postRoute } from '@modules/posts/http/routes/routes';
import { PresensaRoute } from '@modules/presensa/infra/routes';
import { TransactionRoute } from '@modules/transaction/infra/routes/routes.routes';
import { UserRoute } from '@modules/users/infra/routes/routes';
import { Router } from 'express';

const routes = Router();

routes.use(UserRoute);
routes.use(postRoute);
routes.use(ConsumoRoute);
routes.use(TransactionRoute);
routes.use(PresensaRoute);
routes.use(b2bRoute);
routes.use(IndicationRoute);

export { routes };
