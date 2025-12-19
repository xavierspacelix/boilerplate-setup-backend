import cookieParser from 'cookie-parser';
import express from 'express';

import { env } from '@config/env';
import { openAPIRouter } from '@docs/openAPIRouter';
import { i18nMiddleware } from '@i18n/index';
import { errorMiddleware } from '@middlewares/errorMiddleware';
import rateLimiter from '@middlewares/rateLimiter';
import { requestLogger } from '@middlewares/requestLogger';

const app = express();

app.use(express.json());

// middlewares
app.use(i18nMiddleware);
app.use(requestLogger);
app.use(rateLimiter);
app.use(cookieParser());
// routes

if (env.isDevelopment) {
  app.use(openAPIRouter);
}
// error middleware
app.use(errorMiddleware);

export default app;
