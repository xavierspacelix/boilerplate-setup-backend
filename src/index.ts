import app from 'app';
import http from 'http';

import { env } from '@config/env';
import { logger } from '@utils/logger';
import { resources } from '@utils/resources';

let isShuttingDown = false;
let server: http.Server | null = null;

// Shutdown
const shutdown = async (signal: string) => {
  if (isShuttingDown) {
    logger.warn(`⚠️ Received ${signal} during shutdown, forcing exit`);
    process.exit(1);
  }
  isShuttingDown = true;

  // Force exit
  setTimeout(() => {
    logger.error('⚠️ Shutdown timed out, forcing exit');
    process.exit(1);
  }, 10000).unref();

  logger.info(`🔻 Received: ${signal}, Shutting down...`);
  try {
    if (server) {
      // Fix hanging server
      if (server.listening) {
        await new Promise<void>((resolve, reject) => {
          server!.close((err) => (err ? reject(err) : resolve()));
        });
        logger.info('🛑 HTTP server stopped');
      } else {
        logger.warn(
          '⚠️ HTTP server was created but not listening (skipping close)'
        );
      }
    }

    await resources.disconnectAll();
    logger.info('🛑 All resources disconnected');
  } catch (err) {
    logger.error({ err }, '❌ Shutdown error');
  } finally {
    process.exit(0);
  }
};

async function start() {
  // Signal binding
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // Handle uncaught errors
  process.on('uncaughtException', async (err) => {
    logger.fatal({ err }, '💥 Uncaught exception');
    await shutdown('uncaughtException');
  });
  process.on('unhandledRejection', async (reason) => {
    logger.fatal({ reason }, '💥 Unhandled promise rejection');
    await shutdown('unhandledRejection');
  });

  try {
    logger.info(`🚀 Service startup initiated (PID: ${process.pid})`);

    logger.info('🔗 Connecting resources...');
    await resources.connectAll();
    logger.info('✅ All resources connected');

    server = http.createServer(app);

    if (server) {
      // Init API Server
      server.listen(env.PORT, env.HOST, () => {
        logger.info(`🚀 Server running on port ${env.PORT}`);
      });
    }
  } catch (err) {
    logger.error({ err }, '❌ Startup failed');
    process.exit(1);
  }
}

start();
