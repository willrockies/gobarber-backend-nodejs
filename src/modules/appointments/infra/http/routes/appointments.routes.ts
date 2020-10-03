import { Router, request, response } from 'express';

import { parseISO } from 'date-fns';
import { getCustomRepository } from "typeorm";


import AppointmentsRepository from '@modules/appointments/repositories/AppointmetsRepository';

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// SoC: Separation of concerns (separação de preocupação)
//foi crianda esta rota no index.ts http://localhost:3333/appointments
/*
* Listando todos os agendamento
* Sempre que precisar trazer um valor
*/

// DTO - Data Transfer Object
// Preocupações da Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
})

/*
* Cadastrando agendamento
*/
appointmentsRouter.post('/', async (request, response) => {
  /**
  *
  * Provider seria o prestador de serviço no caso o barbeiro
  *
  */

  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentsService();
  const appointment = await createAppointment.execute(
    {
      date: parsedDate,
      provider_id
    })

  return response.json(appointment);

});


export default appointmentsRouter;
