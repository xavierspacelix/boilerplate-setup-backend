import * as Minio from 'minio';

import { env } from '@config/env';

export const minioClient = new Minio.Client({
  endPoint: env.MINIO_INTERNAL_ENDPOINT,
  port: env.MINIO_PORT,
  useSSL: false,
  accessKey: env.MINIO_ROOT_USER,
  secretKey: env.MINIO_ROOT_PASSWORD,
});
