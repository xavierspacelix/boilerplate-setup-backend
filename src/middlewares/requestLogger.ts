import type { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { logger } from '@utils/logger';

/**
 * Express middleware that logs incoming HTTP requests.
 *
 * - Generates a unique request ID and attaches it to `res.locals.requestId`.
 * - Logs method, path, query parameters, route parameters, and request body.
 * - Calls `next()` to pass control to the next middleware or route handler.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = uuidv4();
  res.locals.requestId = requestId;

  logger.info({
    requestId,
    type: 'REQUEST',
    method: req.method,
    path: req.path,
    params: req.params,
    query: req.query,
    body: req.body,
  });

  next();
};
