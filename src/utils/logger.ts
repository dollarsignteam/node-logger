import { isEmpty, toJSONString } from '@dollarsign/utils';
import { TransformableInfo } from 'logform';
import { createLogger as createWinstonLogger, format, Logger, transports } from 'winston';

const { combine, timestamp, printf, label, splat, ms } = format;

const logTemplate = printf(templateFactory);
const logTimestamp = timestamp({
  format: 'YYYY-MM-DD HH:mm:ss.SSS',
});

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

export interface LoggerOptions {
  level?: string;
  name?: string;
  context?: string;
}

/**
 * @param {LoggerOptions} options logger options
 * @returns {Logger} winston logger
 */
export function createLogger(options?: LoggerOptions): Logger {
  const level = options?.level ?? 'debug';
  const name = options?.name ?? 'Logger';
  const context = options?.context ?? 'inspect';
  const logLabel = label({ label: `[${name}][${context}]` });
  return createWinstonLogger({
    level,
    format: combine(splat(), ms(), logTimestamp, logLabel, logTemplate),
    transports: [new transports.Console()],
  });
}
