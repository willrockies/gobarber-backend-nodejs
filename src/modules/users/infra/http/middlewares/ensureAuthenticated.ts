import { Request, Response, NextFunction } from 'express';
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  // Validação do token JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  // foi dividido o authHeader em type -> Bearer e o token, porem eu não preciso do type no array
  // a primeira posição está fazia, pois isto é um truque do javascipt
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    //  esta maluquice é para forçar o decoded é do tipo TokenPayload
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    }
    return next();

  } catch{
    throw new AppError('Invalid JWT token', 401)
  }

}
