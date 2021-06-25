import { Format, format } from 'logform';
import winston, { createLogger as createWinstonLogger, Logger, transports } from 'winston';

import { customColors, customLevels } from '@/constants';
import { LoggerOptions } from '@/interfaces';
import { loggerInfoFormat } from '@/utils/logger-Info-format';
import { simpleFormat } from '@/utils/simple-format';
import { splatFormat } from '@/utils/splat-format';

const { combine, colorize, ms } = format;

/**
 * @param {LoggerOptions} opts logger options
 * @returns {LoggerOptions} modified logger options
 */
export function getOptions(opts: LoggerOptions): LoggerOptions {
  const { LOGGER_COLORIZE, LOGGER_DISPLAY_DIFFERENT_TIMESTAMP } = process.env;
  const options = { ...opts };
  options.level = opts?.level || 'silly';
  options.colorize = opts?.colorize ?? LOGGER_COLORIZE !== 'false';
  options.displayDifferentTimestamp = opts?.displayDifferentTimestamp ?? LOGGER_DISPLAY_DIFFERENT_TIMESTAMP !== 'false';
  return options;
}

/**
 * @param {LoggerOptions} options logger options
 * @returns {Logger} winston logger
 */
export function createLogger(opts?: LoggerOptions): Logger {
  const logFormat: Format[] = [];
  const options = getOptions(opts);
  if (options.colorize) {
    logFormat.push(colorize());
  }
  if (options.displayDifferentTimestamp) {
    logFormat.push(ms());
  }
  winston.addColors(customColors);
  return createWinstonLogger({
    level: options.level,
    levels: customLevels,
    format: combine(...logFormat, loggerInfoFormat(options), splatFormat(), simpleFormat),
    transports: [new transports.Console()],
  });
}
