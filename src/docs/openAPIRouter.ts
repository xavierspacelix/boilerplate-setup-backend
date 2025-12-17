import express, { type Response, type Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { generateOpenAPIDocument } from '@docs/openAPIDocumentGenerator';

export const openAPIRouter: Router = express.Router();
const openAPIDocument = generateOpenAPIDocument();

openAPIRouter.get('/swagger.json', (_req, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openAPIDocument);
});

openAPIRouter.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(openAPIDocument, {
    customSiteTitle: 'KB Groupware API',
  })
);
