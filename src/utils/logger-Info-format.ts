import { Format, format } from 'logform';

import { CALLER, INFO, LEVEL, SPLAT } from '@/constants';
import { CallerInfo, ChangeableInfo, LoggerInfo, LoggerOptions } from '@/interfaces';
import { getTimestamp } from '@/utils/get-timestamp';

/**
 * @param {ChangeableInfo} info Logform info message
 * @param {LoggerOptions} opts logger options
 * @returns {ChangeableInfo} logger information
 */
export function loggerInfoFactory(info: ChangeableInfo, opts: LoggerOptions): ChangeableInfo {
  const loggerInfo: LoggerInfo = {
    level: info[LEVEL],
    name: opts?.name || 'Logger',
    platform: opts?.platform || 'node',
    timestamp: getTimestamp(opts?.timestampFormat),
    colorize: opts?.colorize,
  };
  info[INFO] = loggerInfo;
  info[CALLER] = {} as CallerInfo;
  const splat = info[SPLAT] || [];
  const callerInfo = [...splat].pop() as ChangeableInfo;
  if (callerInfo && callerInfo[CALLER]?.functionName) {
    info[CALLER] = splat.pop()[CALLER];
    info[SPLAT] = splat;
  }
  return info;
}

/**
 * @param {LoggerOptions} opts logger info options
 * @returns {Format} logger info format
 */
export function loggerInfoFormat(opts?: LoggerOptions): Format {
  return format(loggerInfoFactory)(opts);
}
