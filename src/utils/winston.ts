import { isEmpty, toJSONString } from '@dollarsign/utils';
import { format, TransformableInfo } from 'logform';
import { createLogger, Logger, transports } from 'winston';

import { INFO } from '@/constants';
import { LoggerInfo, LoggerOptions } from '@/interfaces';
import { loggerInfoFormat } from '@/utils/logger-Info-format';
import { splatFormat } from '@/utils/splat-format';

const { combine, printf, splat, simple, json } = format;

const templateFormat = printf(templateFactory);

/**
 * @param {TransformableInfo} info logs metadata
 * @returns {string} logs template `string`
 */
export function templateFactory(info: TransformableInfo): string {
  const { message, ...args } = info;
  const symbol = info as unknown;
  const loggerInfo: LoggerInfo = symbol[INFO];
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
  // const loggerInfoFormat = loggerInfoFormatWrap(opts);
  return createLogger({
    level: opts?.level || 'silly',
    format: combine(splatFormat(), loggerInfoFormat(opts)),
    transports: [
      new transports.Console({
        format: combine(splat(), simple()),
        // format: combine(simple()),
      }),
    ],
  });
}
