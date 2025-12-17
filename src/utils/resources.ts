import { redis } from '@config/redis';
import { logger } from './logger';
import { RedisConnectionError } from '@errors/index';

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
