// Overwrite da classe do express para incluir a informação do usuario

declare namespace Express {
  export interface Request {
    user: {
      id: string
    }
  }
}
