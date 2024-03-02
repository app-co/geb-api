/* eslint-disable import-helpers/order-imports */
import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { createServer } from 'http';
import 'reflect-metadata';
import socket from 'socket.io';

import path from 'path';

import { ZodError } from 'zod';
import { Route } from './routes/index.routes';

import '@shared/container';
import { Err } from '../../errors/AppError';

const app = express();
const server = createServer(app);
const io = new socket.Server(server);

export const clients: Array<any> = [];

// io.on('connection', (client: any) => {
//    console.log(`conectado ${client.id}`);
// });

// io.off('dis', h => {
//    console.log(`disconectado ${h.id}`);
// });

app.use((req: Request, res: Response, nex: NextFunction) => {
   req.io = io;
   nex();
});
// app.use(rateLimiter);
app.use(cors());
app.use(express.json());

app.use(Route);
app.use(errors());

app.use(
   '/file/post',
   express.static(
      path.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'post'),
   ),
);

app.use(
   '/file/avatar',
   express.static(
      path.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'avatar'),
   ),
);

app.use(
   '/file/logo',
   express.static(
      path.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'logo'),
   ),
);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
   if (err instanceof Err) {
      return res.status(err.statusCode).json({
         status: 'error',
         message: err.message,
      });
   }

   if (err instanceof ZodError) {
      return res.status(409).json({
         status: 'error',
         message: `Erro de validação: ${err.errors[0].path[0]} ${err.errors[0].message}`,
      });
   }

   console.log(err);

   return res.status(500).json({
      status: 'error',
      message: 'Erro interno',
   });
});

server.listen(3333, () => console.log('listening on port 3333'));

export { app };
