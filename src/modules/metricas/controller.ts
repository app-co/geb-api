import { Request, Response } from 'express';

import { MetricService } from './services';

const metricService = new MetricService();

export class MetricController {
  async user(req: Request, res: Response): Promise<Response> {
    const userId = req.user.id;

    const get = await metricService.user(userId);

    return res.json(get);
  }

  async global(req: Request, res: Response): Promise<Response> {
    const get = await metricService.global();

    return res.json(get);
  }
}
