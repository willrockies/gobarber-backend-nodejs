//sobrepondo uma bliblioteca existente do express, mais conhecido como override

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}