import { Router, response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../../../../modules/appointments/repository/AppointmentsRepository';
import CreateAppointmentService from '../../../../modules/appointments/services/CreateAppointmentService';
import { AppDataSource } from '../data-source';
import Appointment from '../../../../modules/appointments/infra/typeorm/entities/Appointment';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);
  const appointmentsRepository = AppDataSource.getRepository(Appointment);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);

});

appointmentsRouter.post('/', async (request, response) => {
  try {

    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({ date: parsedDate, provider_id });

    return response.json(appointment);

  } catch (error) {

    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    return response.status(400).json({ error: message })
  }

});

export default appointmentsRouter;