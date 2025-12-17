import {
  ErrorResponseSchema,
  ErrorResponseSchemaWithDetails,
  SuccessResponseSchema,
} from '@dtos/docs';
import { ResponseConfig } from '@asteasolutions/zod-to-openapi';
import { ApiResponseConfig } from '@docs/openAPIResponseConfig';

/**
 * Transforms a list of API response configurations into an OpenAPI-compatible response object.
 *
 * @param {ApiResponseConfig[]} configs - An array of API response config objects, each specifying schema, description, statusCode, and error status.
 * @returns {{ [key: string]: ResponseConfig }} An object where each key is a status code and the value is a response configuration compatible with OpenAPI.
 */
export function createApiResponses(configs: ApiResponseConfig[]): {
  [key: string]: ResponseConfig;
} {
  const responses: { [key: string]: ResponseConfig } = {};
  configs.forEach(({ schema, description, statusCode, isError }) => {
    const finalSchema = isError
      ? statusCode === 400
        ? ErrorResponseSchemaWithDetails
        : ErrorResponseSchema
      : SuccessResponseSchema(schema);
    responses[statusCode] = {
      description,
      content: {
        'application/json': {
          schema: finalSchema,
        },
      },
    };
  });
  return responses;
}
