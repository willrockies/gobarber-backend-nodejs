import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
     /**
  *
  * Provider seria o prestador de serviço no caso o barbeiro
  *
  */

  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointmentsService)
  const appointment = await createAppointment.execute(
    {
      date: parsedDate,
      provider_id
    })

  return response.json(appointment);

  }
}
