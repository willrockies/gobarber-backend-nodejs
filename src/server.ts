import 'reflect-metadata';

// import express from 'express';
import routes from './routes';
import uploadConfig from './config/upload';
// import './database';

// const app = express();

// app.use(routes);

// app.listen(3333, () => {
//   console.log("Server started on port 3333:");

// });

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { AppDataSource } from "./data-source";
import AppError from './errors/AppError';
import cors from 'cors';

AppDataSource.initialize().then(() => {
  const app = express()
  app.use(cors());
  app.use('/files', express.static(uploadConfig.directory));
  app.use(routes);

  app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    console.error(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  },
  );

  return app.listen(3333, () => {
    console.log("Server started on port 3333:");

  });
});