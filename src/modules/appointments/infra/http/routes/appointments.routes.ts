import { Router } from 'express';

import AppointmentsController from '../controllers/AppointmentsController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController()

// SoC: Separation of concerns (separação de preocupação)
//foi crianda esta rota no index.ts http://localhost:3333/appointments
/*
* Listando todos os agendamento
* Sempre que precisar trazer um valor
*/

// DTO - Data Transfer Object
// Preocupações da Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta

appointmentsRouter.use(ensureAuthenticated);

/* appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
}); */

/*
* Cadastrando agendamento
*/
appointmentsRouter.post('/', appointmentsController.create);


export default appointmentsRouter;
