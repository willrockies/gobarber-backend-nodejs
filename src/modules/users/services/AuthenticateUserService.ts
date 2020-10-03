import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '@config/auth'

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';


interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if(!user){
      throw new AppError('Incorrent email/password combination.', 401);
    }

    // user.password - Senha criptografada
    // password - Senha não-criptografada

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new AppError('Incorrent email/password combination.', 401);
    }


    // Usuario autenticado

    // para gerar o token utilizamos o sign da bibilioteca jsonwebtoken e mandamos três parametros:
    // 1 - informações do usuario, menos informações sensivel,
    // 2 - hash para segurança em string
    // 3 - configuração dentro de um objeto

    const {secret, expiresIn} = authConfig.jwt;

    const token = sign({}, secret,{
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };

  }
}

export default AuthenticateUserService;
