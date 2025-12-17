import { Request, Response, NextFunction } from 'express';
import { BaseError } from '@errors/BaseError';
import { keys } from '@i18n/errorKeys';

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: req.t(`errors.${err.message}`),
    });
  }

  return res.status(500).json({
    message: req.t(keys.INTERNAL_SERVER),
  });
}
