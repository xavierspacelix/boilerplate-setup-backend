import express from 'express';
import { i18nMiddleware } from '@i18n/index';
import { errorMiddleware } from '@middlewares/errorMiddleware';
import { env } from '@config/env';
import { openAPIRouter } from '@docs/openAPIRouter';

const app = express();

app.use(express.json());

// i18n middleware
app.use(i18nMiddleware);

// routes

if (env.isDevelopment) {
  app.use(openAPIRouter);
}
// error middleware
app.use(errorMiddleware);

export default app;
