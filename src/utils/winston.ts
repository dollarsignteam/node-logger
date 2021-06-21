import { isEmpty, toJSONString } from '@dollarsign/utils';
import { TransformableInfo } from 'logform';
import { createLogger, format, Logger, transports } from 'winston';

import { LoggerOptions } from '@/constants';

const { combine, timestamp, printf, label, splat, ms } = format;

const logTemplate = printf(templateFactory);
const logTimestamp = timestamp({
  format: 'YYYY-MM-DD HH:mm:ss.SSS Z',
});

/**
 * @param {TransformableInfo} info logs metadata
 * @returns {string} logs template `string`
 */
function templateFactory(info: TransformableInfo): string {
  const { timestamp, label, level, message, ms, ...args } = info;
  const template: string[] = [];
  template.push(timestamp);
  template.push(label);
  template.push(`${level}:`);
  template.push(toJSONString(message));
  if (!isEmpty(args)) {
    template.push('-');
    template.push(`\`${toJSONString(args)}\``);
  }
  template.push(ms);
  return template.join(' ');
}

/**
 * @param {LoggerOptions} options logger options
 * @returns {Logger} winston logger
 */
export function createWinstonLogger(options?: LoggerOptions): Logger {
  const level = options?.level ?? 'silly';
  const name = options?.name ?? 'Logger';
  const platform = options?.platform ?? 'node';
  const logLabel = label({ label: `[${platform}] - [${name}]` });
  return createLogger({
    level,
    format: combine(splat(), ms(), logTimestamp, logLabel, logTemplate),
    transports: [new transports.Console()],
  });
}
