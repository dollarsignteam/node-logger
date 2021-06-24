import { AbstractConfigSetColors, AbstractConfigSetLevels } from 'winston/lib/winston/config';

export enum LogLevels {
  debug = 'debug',
  error = 'error',
  http = 'http',
  info = 'info',
  silly = 'silly',
  success = 'success',
  verbose = 'verbose',
  warn = 'warn',
}

export enum EmojiLogLevels {
  debug = '🟪 debug  ',
  error = '🟥 error  ',
  http = '🟫 http   ',
  info = '️⬜️ info   ',
  silly = '⬛️ silly  ',
  success = '🟩 success',
  verbose = '🟦 verbose',
  warn = '🟧 warn   ',
}

export const customLevels: AbstractConfigSetLevels = {
  error: 0,
  warn: 1,
  info: 2,
  success: 3,
  http: 4,
  verbose: 5,
  debug: 6,
  silly: 7,
};

export const customColors: AbstractConfigSetColors = {
  debug: 'magenta',
  error: 'white redBG',
  http: 'cyan',
  info: 'white',
  silly: 'gray',
  success: 'green',
  verbose: 'blue',
  warn: 'yellow',
};

export const detailColor = ['\x1B[90m\x1B[2m', '\x1B[22m\x1B[39m'];

export type LogLevel = keyof typeof LogLevels;
