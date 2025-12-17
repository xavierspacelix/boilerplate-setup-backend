import z from 'zod';

export type ApiResponseConfig = {
  schema: z.ZodTypeAny;
  description: string;
  statusCode: number;
  isError: boolean;
};

/**
 * Generates a list of standard API response configurations including success and common error responses.
 *
 * @template T
 * @param {T} successSchema - The Zod schema representing the success response.
 * @param {string} [successDescription="Request succeeded"] - Description for the success response.
 * @param {number} [statusCode=200] - The status code to use for the success response.
 * @param {number[]} [omitStatusCodes=[]] - An array of HTTP status codes to exclude from the result.
 * @returns {ApiResponseConfig[]} An array of standard API response configurations.
 */
export function generateStandardResponses<T extends z.ZodTypeAny>(
  successSchema: T,
  successDescription: string = 'Request succeeded',
  statusCode: number = 200,
  omitStatusCodes: number[] = [] // Optional exclusion/omit list
): ApiResponseConfig[] {
  const responses: ApiResponseConfig[] = [];

  // Success response
  if (!omitStatusCodes.includes(statusCode)) {
    responses.push({
      schema: successSchema,
      description: successDescription,
      statusCode,
      isError: false,
    });
  }

  const errorTemplates: { code: number; description: string }[] = [
    { code: 400, description: 'Bad request error' },
    { code: 401, description: 'Unauthorized error' },
    { code: 403, description: 'Forbidden error' },
    { code: 404, description: 'Not found error' },
    { code: 409, description: 'Conflict error' },
    { code: 415, description: 'Unsupported media type' },
    { code: 422, description: 'Validation error' },
    { code: 429, description: 'Too many requests' },
    { code: 500, description: 'Internal server error' },
  ];

  for (const { code, description } of errorTemplates) {
    if (!omitStatusCodes.includes(code)) {
      responses.push({
        schema: z.null(),
        description,
        statusCode: code,
        isError: true,
      });
    }
  }

  return responses;
}
