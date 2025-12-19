import { env } from '@config/env';
import { minioClient } from '@config/minio';
import { redis } from '@config/redis';
import { RedisConnectionError, StorageError } from '@errors/index';

import { logger } from './logger';

export const resources = {
  async connectAll() {
    // Redis
    try {
      await redis.connect();
      logger.info('✅ Redis connected');
    } catch (err) {
      throw new RedisConnectionError({ message: (err as Error).message });
    }

    // Handle runtime Redis errors (after initial connect)
    redis.on('error', (err) => {
      logger.error({ err }, '❌ Redis runtime error');
      // Graceful shutdown
      process.kill(process.pid, 'SIGTERM');
    });

    try {
      await minioClient.bucketExists(env.MINIO_BUCKETNAME);
      logger.info('✅ MinIO reachable');
    } catch (err) {
      logger.error({ err }, '❌ MinIO unreachable');
      throw new StorageError('Failed to reach MinIO');
    }
  },

  async disconnectAll() {
    // Redis
    try {
      await redis.quit();
      logger.info('🛑 Redis disconnected');
    } catch (err) {
      logger.error({ err }, '❌ Error disconnecting Redis');
    }
  },
};
