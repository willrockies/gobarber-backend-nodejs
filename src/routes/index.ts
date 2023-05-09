import express, { Router } from 'express';

import appointmentRouter from './appointments.routes';
import sessionsRouter from './session.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use(express.json());

routes.use('/appointments', appointmentRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;