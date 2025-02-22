import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  // Customize error handling as needed, e.g. check for Prisma errors
  res.status(500).json({ error: 'Internal Server Error' });
};
