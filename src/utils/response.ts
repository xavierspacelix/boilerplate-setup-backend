import { Request, Response } from 'express';

import { BaseError } from '@errors/BaseError';
import { keys } from '@i18n/errorKeys';

export function SendSuccess<T>(
  res: Response,
  data: T,
  message: string,
  code: string = keys.SUCCESS,
  statusCode = 200
) {
  return res.status(statusCode).json({
    success: true,
    code,
    message,
    data,
  });
}

export function SendError(res: Response, err: unknown, req: Request) {
  // Known / custom error
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: req.t(`errors.${err.message}`),
      errors: err.detail
        ? Object.fromEntries(
            Object.entries(err.detail).map(([k, v]) => [k, req.t(v)])
          )
        : undefined,
    });
  }

  // Unknown error
  return res.status(500).json({
    success: false,
    code: keys.INTERNAL_SERVER,
    message: req.t(`errors.${keys.INTERNAL_SERVER}`),
  });
}
