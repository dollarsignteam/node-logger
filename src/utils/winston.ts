import { isEmpty, toJSONString } from '@dollarsign/utils';
import { format, TransformableInfo } from 'logform';
import { createLogger, Logger, transports } from 'winston';

import { Info } from '@/constants';
import { LoggerInfo, LoggerOptions } from '@/interfaces';
import { loggerInfoFactory } from '@/utils/logger-Info-factory';

const { combine, printf, splat, simple, json } = format;

const templateFormat = printf(templateFactory);
const loggerInfoFormatWrap = format(loggerInfoFactory);

/**
 * @param {TransformableInfo} info logs metadata
 * @returns {string} logs template `string`
 */
export function templateFactory(info: TransformableInfo): string {
  const { message, ...args } = info;
  const symbol = info as unknown;
  const loggerInfo: LoggerInfo = symbol[Info];
  console.log(info);
  console.info(loggerInfo);
  const template: string[] = [];
  // template.push(timestamp);
  // template.push(label);
  // template.push(`${level}:`);
  template.push(toJSONString(message));
  if (!isEmpty(args)) {
    template.push('-');
    template.push(`\`${toJSONString(args)}\``);
  }
  return template.join(' ').trim();
}

/**
 * @param {LoggerOptions} options logger options
 * @returns {Logger} winston logger
 */
export function createWinstonLogger(opts?: LoggerOptions): Logger {
  const loggerInfoFormat = loggerInfoFormatWrap(opts);
  return createLogger({
    level: opts?.level || 'silly',
    // format: combine(splat(), loggerInfoFormat),
    transports: [
      new transports.Console({
        format: combine(simple()),
      }),
    ],
  });
}
