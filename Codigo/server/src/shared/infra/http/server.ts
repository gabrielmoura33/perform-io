import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import morgan from 'morgan';
import routes from './routes';
import 'dotenv';
import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use('/api/v1', routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: err.message,
  });
});

app.listen(process.env.APP_PORT || 3333, () => {
  console.log(
    `🛰  - Running with the environment: ${process.env.NODE_ENVIRONMENT}`,
  );
  console.log(`🛰  - Server Started on PORT:${process.env.APP_PORT}`);
});
