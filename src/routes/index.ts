import { Router } from "express";
import appointmentRouter from './appointments.routes'
import express from 'express';
const routes = Router();
routes.use(express.json())
routes.use('/appointments', appointmentRouter);
export default routes;