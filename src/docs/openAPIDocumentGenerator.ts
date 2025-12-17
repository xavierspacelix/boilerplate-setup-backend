import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import { securitySchemeRegistry } from '@utils/securityOpenApiRegistry';

export type OpenAPIDocument = ReturnType<
  OpenApiGeneratorV3['generateDocument']
>;

/**
 * Generates a fully assembled OpenAPI 3.1.0 document by merging route registries
 * and attaching base metadata and external docs.
 *
 * @returns {OpenAPIDocument} The complete OpenAPI document object.
 */
export function generateOpenAPIDocument(): OpenAPIDocument {
  const registry = new OpenAPIRegistry([securitySchemeRegistry]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.1.0',
    info: {
      version: '1.0.0',
      title: 'KB Groupware Chat API',
    },
    externalDocs: {
      description: 'View the raw OpenAPI Specification in JSON format',
      url: '/swagger.json',
    },
  });
}
