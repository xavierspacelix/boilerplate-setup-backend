import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const securitySchemeRegistry = new OpenAPIRegistry();

/**
 * Define JWT Bearer for OpenAPI, works globally, just specify:
 * security: [
 *    {
 *      BearerAuth: [],
 *    },
 * ],
 * Per endpoint
 */
securitySchemeRegistry.registerComponent('securitySchemes', 'BearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: 'Enter your JWT token in the format **Bearer <token>**',
});
