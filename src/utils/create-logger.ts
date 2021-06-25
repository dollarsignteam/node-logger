import { Format, format } from 'logform';
import winston, { createLogger as createWinstonLogger, Logger, transports } from 'winston';

import { customColors, customLevels, LogLevels } from '@/constants';
import { LoggerOptions } from '@/interfaces';
import { loggerInfoFormat } from '@/utils/logger-Info-format';
import { simpleFormat } from '@/utils/simple-format';
import { splatFormat } from '@/utils/splat-format';

const { combine, colorize, ms } = format;

/**
 * @param {LoggerOptions} options logger options
 * @returns {Logger} winston logger
 */
export function createLogger(opts?: LoggerOptions): Logger {
  const logFormat: Format[] = [];
  if (opts?.colorize) {
    logFormat.push(colorize());
  }
  if (opts?.displayDifferentTimestamp) {
    logFormat.push(ms());
  }
  winston.addColors(customColors);
  return createWinstonLogger({
    level: opts?.level || LogLevels.silly,
    levels: customLevels,
    format: combine(...logFormat, loggerInfoFormat(opts), splatFormat(), simpleFormat),
    transports: [new transports.Console()],
  });
}
