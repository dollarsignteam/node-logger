import { toJSONString } from '@dollarsign/utils';
import { format } from 'logform';
import { types } from 'util';

import { CALLER, DATA, detailColor, EmojiLogLevels, INFO } from '@/constants';
import { ChangeableInfo } from '@/interfaces';

const { printf } = format;

/**
 * @param {ChangeableInfo} info Logform info message
 * @returns {string} logs message
 */
export function simpleFactory(info: ChangeableInfo): string {
  const { message, level } = info;
  const data = info[DATA];
  const { timestamp, name, level: levelInfo, platform, colorize } = info[INFO];
  const template: string[] = [];
  const emojiLogLevel: string = EmojiLogLevels[levelInfo];
  const wrap = colorize ? detailColor : ['', ''];
  template.push(`${wrap[0]}${timestamp}${wrap[1]}`);
  const logLevel = emojiLogLevel.replace(levelInfo, level);
  template.push(`${wrap[0]}[${platform}]${wrap[1]}`);
  template.push(logLevel);
  template.push(`${wrap[0]}[${name}]${wrap[1]}`);
  if (info[CALLER]?.functionName) {
    const { relativePath, absolutePath, lineNumber, columnNumber, functionName } = info[CALLER];
    if (`${absolutePath}`.indexOf('node_modules') > -1) {
      template.push(`${wrap[0]}[${functionName}]${wrap[1]}`);
    } else {
      template.push(`${wrap[0]}[${relativePath}:${lineNumber}:${columnNumber} ${functionName}]${wrap[1]}`);
    }
  }
  if (types.isNativeError(message)) {
    template.push(message);
  } else {
    template.push(toJSONString(message));
  }
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
