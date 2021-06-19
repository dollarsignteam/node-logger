import { isEmpty, toJSONString } from '@dollarsign/utils';
import { TransformableInfo } from 'logform';
import { createLogger as createWinstonLogger, format, Logger, transports } from 'winston';

const { combine, timestamp, printf, label, splat, ms, align } = format;

const logTimestamp = timestamp({
  format: 'YYYY-MM-DD HH:mm:ss.SSS',
});
const logTemplate = printf(templateFactory);
const logLabel = label({ label: '[Logger][Service]' });

/**
 * @param {TransformableInfo} info logs metadata
 * @returns {string} logs template `string`
 */
function templateFactory(info: TransformableInfo): string {
  const { timestamp, label, level, message, ms, ...meta } = info;
  const template: string[] = [];
  template.push(timestamp);
  template.push('[node] -');
  template.push(`${label}`);
  template.push(`${level}`);
  template.push(message);
  if (!isEmpty(meta)) {
    template.push(`- \`${toJSONString(meta)}\``);
  }
  template.push(ms);
  return template.join(' ');
}

interface LoggerOptions {
  level: string;
  context: string;
  platform: string;
}

/**
 * @param {LoggerOptions} options logger options
 * @returns {Logger} winston logger
 */
function createLogger(options: LoggerOptions): Logger {
  options;
  return null;
}

const logger = createWinstonLogger({
  level: 'silly',
  format: combine(splat(), ms(), align(), logTimestamp, logLabel, logTemplate),
  transports: [new transports.Console()],
});

logger.debug('debug message');
logger.info('test message %s', 'my string');
logger.warn('test message %d', 123);
logger.verbose('test message %s, %s', 'first', 'second', { number: 123 });
logger.log('error', 'hello', { message: 'world' });
logger.error(new Error('INTERNAL ERROR'));

export { logger, createLogger };
