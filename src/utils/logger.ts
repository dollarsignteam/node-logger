import { isEmpty, toJSONString } from '@dollarsign/utils';
import { TransformableInfo } from 'logform';
import { Logger as TSLogger } from 'tslog';
import { createLogger as createWinstonLogger, format, Logger, transports } from 'winston';

const { combine, timestamp, printf, label, splat, ms } = format;

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
  template.push('[node]');
  template.push('-');
  template.push(`${label}`);
  template.push(`${level}:`);
  template.push(toJSONString(message));
  if (!isEmpty(meta)) {
    template.push('-');
    template.push(`\`${toJSONString(meta)}\``);
  }
  template.push(ms);
  return template.join(' ');
}

interface LoggerOptions {
  level: string;
  name: string;
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
  transports: [
    new transports.Console({
      format: combine(splat(), ms(), logTimestamp, logLabel, logTemplate),
    }),
  ],
});

const tsLogger: TSLogger = new TSLogger();

export { logger, tsLogger, createLogger };
