import { createClient } from 'redis';
import { env } from '@config/env';

export const redis = createClient({
  username: env.REDIS_USER,
  password: env.REDIS_PASSWORD!,
  socket: {
    host: env.REDIS_HOST!,
    port: env.REDIS_PORT!,
  },
});
