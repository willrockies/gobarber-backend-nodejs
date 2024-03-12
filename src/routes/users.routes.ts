import { Router } from 'express';
import multer from 'multer';
import UploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(UploadConfig);



usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {

    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);

    return response.status(400).json({ error: message })
  }

});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  console.log(request.file);

  try {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      id: request.user.id,
      avatarFilename: request.file?.filename,
    });
    delete user.password;
    return response.json({ user });

  } catch (err) {
    let message;
    if (err instanceof Error) message = err.message;
    else message = String(err);

    return response.status(400).json({ err: message });
  }
});

export default usersRouter;