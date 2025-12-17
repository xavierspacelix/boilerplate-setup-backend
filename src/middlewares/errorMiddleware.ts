import { SendError } from '@utils/response';
import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  return SendError(res, err, req);
}
