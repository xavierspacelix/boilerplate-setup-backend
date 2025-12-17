import type { Request, Response } from 'express';
import { env } from '@config/env';
import { RateLimitError } from '@errors/index';
import { SendError } from '@utils/response';
import { ipKeyGenerator, rateLimit } from 'express-rate-limit';

/**
 * Express middleware for rate limiting using `express-rate-limit`.
 *
 * - Limits the number of requests per IP within a time window.
 * - Uses a custom `RateLimitError` to produce standardized error responses.
 * - Generates the client key from the IP address using `ipKeyGenerator`.
 *
 * Configuration:
 * - `limit`: Max number of requests (from env `COMMON_RATE_LIMIT_MAX_REQUESTS`)
 * - `windowMs`: Time window for the rate limit (from env `COMMON_RATE_LIMIT_WINDOW_MS`)
 * - `standardHeaders`: Enables `RateLimit-*` headers.
 * - `legacyHeaders`: Enables `X-RateLimit-*` headers (for legacy clients).
 *
 * @type {import('express-rate-limit').RateLimitRequestHandler}
 */
const rateLimiter: import('express-rate-limit').RateLimitRequestHandler =
  rateLimit({
    legacyHeaders: true,
    limit: env.COMMON_RATE_LIMIT_MAX_REQUESTS,
    standardHeaders: true,
    windowMs: env.COMMON_RATE_LIMIT_WINDOW_MS,
    keyGenerator: (req: Request, _res: Response) => {
      return ipKeyGenerator(req.ip as string);
    },

    handler: (req: Request, res: Response) => {
      return SendError(res, new RateLimitError(), req);
    },
  });

export default rateLimiter;
