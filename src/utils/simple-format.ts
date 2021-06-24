import { toJSONString } from '@dollarsign/utils';
import { format } from 'logform';

import { CALLER, DATA, INFO } from '@/constants';
import { ChangeableInfo } from '@/interfaces';

const { printf } = format;

/**
 * @param {ChangeableInfo} info Logform info message
 * @returns {string} logs message
 */
export function simpleFactory(info: ChangeableInfo): string {
  const { message, level } = info;
  const data = info[DATA];
  const { timestamp, name, level: levelInfo, platform } = info[INFO];
  const template: string[] = [];
  template.push(timestamp);
  template.push(`${level.replace(levelInfo, levelInfo.toUpperCase())}\t`);
  template.push(`[${platform}][${name}]`);
  if (info[CALLER]?.functionName) {
    const { relativePath, absolutePath, lineNumber, columnNumber, functionName } = info[CALLER];
    if (`${absolutePath}`.indexOf('node_modules') > -1) {
      template.push(`[${functionName}]`);
    } else {
      template.push(`[${relativePath}:${lineNumber}:${columnNumber} ${functionName}]`);
    }
  }
  template.push(toJSONString(message));
  if (data?.length) {
    template.push('-');
    if (data.length == 1) {
      template.push(`\`${toJSONString(data[0])}\``);
    } else {
      template.push(`\`${toJSONString(data)}\``);
    }
  }
  return template.join(' ').trim();
}

export const simpleFormat = printf(simpleFactory);
