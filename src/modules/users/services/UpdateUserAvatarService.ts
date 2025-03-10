import { AppDataSource } from '../../../shared/infra/http/data-source';
import path from "path";
import fs from "fs";
import uploadConfig from "../../../config/upload";
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';

interface Request {
    id: string;
    avatarFilename: string | undefined;
}

class UpdateUserAvatarService {
    public async execute({ id, avatarFilename }: Request): Promise<User> {
        const usersRepository = AppDataSource.getRepository(User);

        const user = await usersRepository.findOne({
            where: { id },
        });

        if (!user) {
            throw new Error("Only authenticated user can change avatar");
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