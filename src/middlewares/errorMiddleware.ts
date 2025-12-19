import { NextFunction, Request, Response } from 'express';

import { SendError } from '@utils/response';

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  return SendError(res, err, req);
}
