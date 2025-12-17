import express from 'express';
import { i18nMiddleware } from '@i18n/index';
import { errorMiddleware } from '@middlewares/errorMiddleware';

const app = express();

app.use(express.json());

// i18n middleware
app.use(i18nMiddleware);

// routes

// error middleware
app.use(errorMiddleware);

export default app;
