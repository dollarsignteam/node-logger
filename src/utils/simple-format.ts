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
  const { message } = info;
  const data = info[DATA];
  const { timestamp, name, level, platform } = info[INFO];
  const template: string[] = [];
  template.push(timestamp);
  template.push(`[${platform}][${name}]`);
  if (info[CALLER]?.functionName) {
    const { relativePath, lineNumber, columnNumber, functionName } = info[CALLER];
    template.push(`[${relativePath}:${lineNumber}:${columnNumber} ${functionName}]`);
  }
  template.push(`${level}:`.toUpperCase());
  template.push(toJSONString(message));
  if (data?.length) {
    template.push('-');
    template.push(`\`${toJSONString(data)}\``);
  }
  return template.join(' ').trim();
}

export const simpleFormat = printf(simpleFactory);
