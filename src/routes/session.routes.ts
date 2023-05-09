import { Router } from 'express';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
   

    return response.json({ok:true});
  } catch (error) {

    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    return response.status(400).json({ error: message })
  }

});

export default sessionsRouter;