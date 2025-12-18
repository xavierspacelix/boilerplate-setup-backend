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
  DATABASE_URL: z
    .url()
    .default('postgresql://myuser:mypassword@localhost:5432/mydatabase'),
  REDIS_HOST: z.string().min(1).default('localhost'),
  REDIS_PORT: z.coerce.number().int().positive().default(6379),
  REDIS_USER: z.string().min(1).default('default'),
  REDIS_PASSWORD: z.string().min(1).default(''),
  FILE_HOST: z.string().default('localhost:3001/api'),
  MINIO_MODE: z.string().default('http'),
  MINIO_INTERNAL_ENDPOINT: z.string().default('192.168.1.1'),
  MINIO_PUBLIC_ENDPOINT: z.string().default('192.168.1.1'),
  MINIO_ROOT_USER: z.string().default('your_minio_user'),
  MINIO_ROOT_PASSWORD: z.string('your_minio_password'),
  MINIO_PORT: z.coerce.number().default(9000),
  MINIO_BUCKETNAME: z.string().default('kbgroupware'),
  COMMON_RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(1000),
  COMMON_RATE_LIMIT_MAX_REQUESTS: z.coerce
    .number()
    .int()
    .positive()
    .default(1000),
  CORS_ORIGIN: z
    .string()
    .default('http://localhost:3001')
    .transform((str) => str.split(',').map((url) => url.trim())),
  ALLOWED_MIME_TYPES: z
    .string()
    .transform((str) => str.split(',').map((s) => s.trim()))
    .default([
      'image/png',
      'image/jpeg',
      'application/pdf',
      'application/zip',
      'application/x-rar-compressed',
    ]),
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
