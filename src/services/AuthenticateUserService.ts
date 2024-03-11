
import User from "../models/User";
import { AppDataSource } from "../data-source";
import { compare } from "bcryptjs";
import { sign,verify } from "jsonwebtoken";
import authConfig from "../config/auth";


interface Request {
    email: string;
    password: string;
}
interface Response {
    user: User;
    token: string;

}

class AuthenticateUserService {
    async execute({ email, password }: Request): Promise<Response> {
        const usersRespository = AppDataSource.getRepository(User);

        const user = await usersRespository.findOne({ where: { email } });

        if (!user || !user.password || !password) {
            throw new Error('Incorrect email/password combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }
        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });


        return {
            user,
            token,
        }
    }
}


export default AuthenticateUserService;