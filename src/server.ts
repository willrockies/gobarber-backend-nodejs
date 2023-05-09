// import express from 'express';
import routes from './routes';
// import './database';

// const app = express();

// app.use(routes);

// app.listen(3333, () => {
//   console.log("Server started on port 3333:");

// });

import express from "express";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
  const app = express()

  app.use(routes);


  return app.listen(3333, () => {
    console.log("Server started on port 3333:");

  });
});