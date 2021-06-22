import { format } from 'logform';
import { createLogger as createWinstonLogger, Logger, transports } from 'winston';

import { LoggerOptions } from '@/interfaces';
import { loggerInfoFormat } from '@/utils/logger-Info-format';
import { simpleFormat } from '@/utils/simple-format';
import { splatFormat } from '@/utils/splat-format';

const { combine } = format;

/**
 * @param {LoggerOptions} options logger options
 * @returns {Logger} winston logger
 */
export function createLogger(opts?: LoggerOptions): Logger {
  return createWinstonLogger({
    level: opts?.level || 'silly',
    format: combine(splatFormat(), loggerInfoFormat(opts), simpleFormat),
    transports: [new transports.Console()],
  });
}
