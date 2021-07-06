import { Format, format } from 'logform';

import { CALLER, INFO, LEVEL, Options, SPLAT } from '@/constants';
import { CallerInfo, ChangeableInfo, LoggerInfo, LoggerOptions } from '@/interfaces';
import { getTimestamp } from '@/utils/get-timestamp';

/**
 * @param info - Logform info message
 * @param opts - logger options
 * @returns logger information
 */
export function loggerInfoFactory(info: ChangeableInfo, opts: LoggerOptions): ChangeableInfo {
  const loggerInfo: LoggerInfo = {
    level: info[LEVEL],
    name: opts?.name || Options.name,
    platform: opts?.platform || Options.platform,
    timestamp: getTimestamp(opts?.timestampFormat),
    colorize: opts?.colorize,
    displayFilePath: opts?.displayFilePath,
    displayFunctionName: opts?.displayFunctionName,
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
 * @param opts - logger info options
 * @returns logger info format
 */
export function loggerInfoFormat(opts?: LoggerOptions): Format {
  return format(loggerInfoFactory)(opts);
}
