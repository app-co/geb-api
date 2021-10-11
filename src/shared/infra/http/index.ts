/* eslint-disable import-helpers/order-imports */
import 'reflect-metadata';
import { Err } from '@shared/errors/AppError';
import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import path from 'path';

import { Route } from './routes/index.routes';

import '@shared/container';

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', socket => {
   console.log('conected', socket.id);
});

app.use(cors());
app.use(express.json());
app.use(Route);
app.use(errors());

app.use(
   '/file/post',
   express.static(
      path.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'post', 'resized'),
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

   console.log(err);

   return res.status(500).json({
      status: 'error',
      message: 'Erro interno',
   });
});

app.listen(3333, () => console.log('listening on port 3333'));

export { app };
