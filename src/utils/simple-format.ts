import { jsonStringify } from '@dollarsign/utils';
import { format } from 'logform';

import { CALLER, colorWrap, DATA, EmojiLogLevels, INFO } from '@/constants';
import { ChangeableInfo } from '@/interfaces';

const { printf } = format;

/**
 * @param message - log message
 * @param colorize - is enabled color flag
 * @returns modified message
 */
export function getMessage(message: string, colorize: boolean): string {
  return colorize ? `${colorWrap[0]}${message}${colorWrap[1]}` : message;
}

/**
 * @param data - data info list
 * @returns data info string
 */
export function getDataInfo(data: unknown[]): string {
  const info = data?.length === 1 ? data[0] : data;
  return `\`${jsonStringify(info)}\``;
}

/**
 * @param info - Logform info message
 * @returns logs message
 */
export function simpleFactory(info: ChangeableInfo): string {
  const { message, level: levelInfo, ms } = info;
  const { timestamp, name, level, platform, colorize, displayFilePath, displayFunctionName } = info[INFO];
  const emojiLogLevel: string = EmojiLogLevels[level];
  const logLevel = emojiLogLevel.replace(level, levelInfo).replace(level, level.toUpperCase());
  const template: string[] = [];
  template.push(getMessage(timestamp, colorize));
  template.push(getMessage(`[${platform}]`, colorize));
  template.push(logLevel);
  template.push(getMessage(`[${name}]`, colorize));
  if ((displayFilePath || displayFunctionName) && info[CALLER]?.functionName) {
    const fileLocation: string[] = [];
    const { relativePath, absolutePath, lineNumber, columnNumber, functionName } = info[CALLER];
    if (displayFilePath && `${absolutePath}`.indexOf('node_modules') < 0) {
      fileLocation.push(`${relativePath}:${lineNumber}:${columnNumber}`);
    }
    if (displayFunctionName) {
      fileLocation.push(functionName);
    }
    if (fileLocation.length) {
      template.push(getMessage(`[${fileLocation.join(' ')}]`, colorize));
    }
  }
  const logMessage = jsonStringify(message);
  template.push(logMessage);
  if (info[DATA]?.length) {
    template.push(`- ${getDataInfo(info[DATA])}`);
  }
  if (ms) {
    template.push(getMessage(ms, colorize));
  }
  return template.join(' ').trim();
}

export const simpleFormat = printf(simpleFactory);
