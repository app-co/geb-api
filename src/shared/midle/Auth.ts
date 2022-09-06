/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import auth from '@config/auth';
import { Err } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
   iat: number;
   exp: number;
   sub: string;
}

export function Auth(req: Request, res: Response, next: NextFunction) {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      throw new Err('falta o token');
   }

   const [, token] = authHeader.split(' ');

   try {
      const { secret } = auth.jwt;
      const decode = verify(token, secret);

      const { sub } = decode as ITokenPayload;

      req.user = {
         id: sub,
      };

      return next();
   } catch (err) {
      throw new Err('token invalido');
   }
}
