import { IndicationRoute } from '@modules/indication/infra/routes';
import { LinksRoute } from '@modules/Links/http/routes';
import { metricRoute } from '@modules/metricas/routes';
import { postRoute } from '@modules/posts/http/routes/routes';
import { relationship } from '@modules/relationship/infra/routes';
import { situationRoute } from '@modules/situation/infra/routes';
import { RouteStar } from '@modules/starts/infra/routes';
import { UserRoute } from '@modules/users/infra/routes/routes';
import { Router } from 'express';

const routes = Router();

routes.use(UserRoute);
routes.use(postRoute);
routes.use(IndicationRoute);
routes.use(RouteStar);
routes.use(situationRoute);
routes.use(LinksRoute);
routes.use(relationship);
routes.use(metricRoute);

export { routes };
