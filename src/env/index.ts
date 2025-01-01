/* eslint-disable no-underscore-dangle */
import 'dotenv/config';

import { z } from 'zod';

const envSche = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prd']).default('dev'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  ONE_SIGNAL_KEY: z.string(),
  ONE_SIGNAL_APP_ID: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  ADM_ACCESS: z.string(),
});


const _env = envSche.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment', _env.error.format());
  throw new Error('Invalid environment');
}

export const env = _env.data;
