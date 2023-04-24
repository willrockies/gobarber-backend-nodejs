import { Router, response } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repository/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try {

    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = createAppointment.execute({ date: parsedDate, provider });

    return response.send(appointment);
  } catch (error) {

    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    return response.status(400).json({ error: message })
  }

});

export default appointmentsRouter;