import pino from 'pino';
import path, { join } from 'path';
import fs from 'fs';
import { env } from '@config/env';
import { toDateString } from './date';

const logDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// File transport for production
const fileTransport = pino.transport({
  target: 'pino-roll',
  options: {
    file: join(logDir, `app_log_${toDateString(new Date())}`),
    frequency: 'daily',
    size: '10m',
    limit: { count: 14 },
    mkdir: true,
    extension: '.log',
    sync: false,
  },
});

// Pretty console transport for development
const prettyTransport = pino.transport({
  target: 'pino-pretty',
  options: {
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname',
    sync: false,
  },
});

export const logger = pino(
  { level: 'info' },
  env.isProduction ? fileTransport : prettyTransport
);
