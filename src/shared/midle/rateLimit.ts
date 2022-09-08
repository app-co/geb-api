import { Err } from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import redis from 'redis';

const redisClient = redis.createClient({
   host: process.env.REDIS_HOST,
   port: process.env.REDIS_HOST,
   password: process.env.REDIS_PASSWORD,
});

const limiter = new RateLimiterRedis({
   storeClient: redisClient,
   keyPrefix: 'ratelimit',
   points: 5,
   duration: 1,
});

export default async function rateLimiter(
   req: Request,
   res: Response,
   next: NextFunction,
): Promise<void> {
   try {
      await limiter.consume(req.ip);
      return next();
   } catch (err) {
      throw new Err('Muitas requisições', 429);
   }
}
