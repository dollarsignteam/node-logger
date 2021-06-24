import { Format, format } from 'logform';
import winston, { createLogger as createWinstonLogger, Logger, transports } from 'winston';

import { customColors, customLevels } from '@/constants';
import { LoggerOptions } from '@/interfaces';
import { loggerInfoFormat } from '@/utils/logger-Info-format';
import { simpleFormat } from '@/utils/simple-format';
import { splatFormat } from '@/utils/splat-format';

const { combine, colorize } = format;

/**
 * @param {LoggerOptions} options logger options
 * @returns {Logger} winston logger
 */
export function createLogger(opts?: LoggerOptions): Logger {
  const logFormat: Format[] = [];
  const logLevel = opts?.level || 'silly';
  if (opts?.colorize ?? process.env.LOGGER_COLORIZE !== 'false') {
    opts = Object.assign({}, opts, { colorize: true });
    logFormat.push(colorize());
  }
  winston.addColors(customColors);
  return createWinstonLogger({
    level: logLevel,
    levels: customLevels,
    format: combine(...logFormat, loggerInfoFormat(opts), splatFormat(), simpleFormat),
    transports: [new transports.Console()],
  });
}
