import { TransformableInfo } from 'logform';

import { Info, Level } from '@/constants';
import { LoggerInfo, LoggerInfoFactory, LoggerOptions } from '@/interfaces';
import { getTimestamp } from '@/utils/get-timestamp';

/**
 * @param {TransformableInfo} info logs information
 * @param {Record<string, string>} opts options
 * @returns {LoggerInfoFactory} logger information
 */
export function loggerInfoFactory(info: TransformableInfo, opts: LoggerOptions): LoggerInfoFactory {
  const infoObject = info as unknown;
  const loggerInfo: LoggerInfo = {
    level: infoObject[Level],
    name: opts?.name || 'Logger',
    platform: opts?.platform || 'node',
    timestamp: getTimestamp(opts?.timestampFormat),
  };
  const data = { [Info]: loggerInfo };
  return Object.assign(info, data);
}
