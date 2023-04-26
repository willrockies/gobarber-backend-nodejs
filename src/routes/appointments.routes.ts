import { Router, response } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repository/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();


appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);

});

appointmentsRouter.post('/', async (request, response) => {
  try {

    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({ date: parsedDate, provider });

    return response.send(appointment);
  } catch (error) {

    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    return response.status(400).json({ error: message })
  }

});

export default appointmentsRouter;