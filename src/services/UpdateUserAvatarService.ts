import { AppDataSource } from '../data-source';
import path from "path";
import fs from "fs";
import uploadConfig from "../config/upload";
import User from '../models/User';

interface Request {
    user_id: string;
    avatarFilename: string | undefined;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const usersRepository = AppDataSource.getRepository(User);

        const user = await usersRepository.findOne({
            where: { user_id },
        });

        if (!user) {
            throw new Error("Only authenticated user can change avatar")
        }

        if (user.avatar) {
            //deletar avatar anterior
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;

    }
}

export default UpdateUserAvatarService;