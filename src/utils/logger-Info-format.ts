import { Format, format } from 'logform';

import { INFO, LEVEL } from '@/constants';
import { ChangeableInfo, LoggerInfo, LoggerOptions } from '@/interfaces';
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
  };
  info[INFO] = loggerInfo;
  return info;
}

/**
 * @param {LoggerOptions} opts logger info options
 * @returns {Format} logger info format
 */
export function loggerInfoFormat(opts?: LoggerOptions): Format {
  return format(loggerInfoFactory)(opts);
}
