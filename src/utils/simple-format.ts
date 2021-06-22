import { toJSONString } from '@dollarsign/utils';
import { format } from 'logform';

import { DATA, INFO } from '@/constants';
import { ChangeableInfo } from '@/interfaces';

const { printf } = format;

/**
 * @param {ChangeableInfo} info Logform info message
 * @returns {string} logs message
 */
export function simpleFactory(info: ChangeableInfo): string {
  const { message } = info;
  const { timestamp, name, level, platform } = info[INFO];
  const data = info[DATA];
  const template: string[] = [];
  template.push(timestamp);
  template.push(`[${platform}][${name}]`);
  template.push(level.toUpperCase());
  template.push(toJSONString(message));
  if (data && data.length) {
    template.push('-');
    template.push(`\`${toJSONString(data)}\``);
  }
  return template.join(' ').trim();
}

export const simpleFormat = printf(simpleFactory);
