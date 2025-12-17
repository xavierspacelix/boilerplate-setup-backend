import express from 'express';
import { i18nMiddleware } from '@i18n/index';
import { errorMiddleware } from '@middlewares/errorMiddleware';
import { env } from '@config/env';
import { openAPIRouter } from '@docs/openAPIRouter';
import rateLimiter from '@middlewares/rateLimiter';

const app = express();

app.use(express.json());

// middlewares
app.use(i18nMiddleware);
app.use(rateLimiter);

// routes

if (env.isDevelopment) {
  app.use(openAPIRouter);
}
// error middleware
app.use(errorMiddleware);

export default app;
