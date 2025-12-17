import { InternalServerError } from '@errors/index';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ quiet: true });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  VERSION: z.string().default('1.0.0'),
  DATE_TIMEZONE: z.string().default('Asia/Jakarta'),
  HOST: z.string().min(1).default('localhost'),
  PORT: z.coerce.number().int().positive().default(8080),
  REFRESH_TTL: z.string().default('30d'),
  REDIS_HOST: z.string().min(1).default('localhost'),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  REDIS_USER: z.string().min(1).default('default'),
  REDIS_PASSWORD: z.string().min(1).default(''),
  COMMON_RATE_LIMIT_MAX_REQUESTS: z.coerce
    .number()
    .int()
    .positive()
    .default(1000),
  COMMON_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(1000),
  CORS_ORIGIN: z
    .string()
    .default('http://localhost:3001')
    .transform((str) => str.split(',').map((url) => url.trim())),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    '❌ Invalid environment variables:',
    z.treeifyError(parsedEnv.error)
  );
  throw new InternalServerError('Invalid environment variables');
}

export const env = {
  ...parsedEnv.data,
  CORS_ORIGIN: parsedEnv.data.CORS_ORIGIN as string[],
  isDevelopment: parsedEnv.data.NODE_ENV === 'development',
  isProduction: parsedEnv.data.NODE_ENV === 'production',
  isTest: parsedEnv.data.NODE_ENV === 'test',
};
