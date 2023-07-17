import { b2bRoute } from '@modules/B2b/infra/routes';
import { ConsumoRoute } from '@modules/consumo/infra/routes/index.routes';
import { routeGuest } from '@modules/convidado/infra/routes';
import { DonateRoute } from '@modules/Donate/http/routes';
import { IndicationRoute } from '@modules/indication/infra/routes';
import { LinksRoute } from '@modules/Links/http/routes';
import { postRoute } from '@modules/posts/http/routes/routes';
import { PresensaRoute } from '@modules/presensa/infra/routes';
import { relationship } from '@modules/relationship/infra/routes';
import { situationRoute } from '@modules/situation/infra/routes';
import { RouteStar } from '@modules/starts/infra/routes';
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
routes.use(RouteStar);
routes.use(routeGuest);
routes.use(situationRoute);
routes.use(LinksRoute);
routes.use(DonateRoute);
routes.use(relationship);

export { routes };
