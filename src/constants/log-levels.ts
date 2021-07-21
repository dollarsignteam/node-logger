import { AbstractConfigSetColors, AbstractConfigSetLevels } from 'winston/lib/winston/config';

export enum LogLevels {
  debug = 'debug',
  error = 'error',
  fatal = 'fatal',
  http = 'http',
  info = 'info',
  silly = 'silly',
  success = 'success',
  trace = 'trace',
  verbose = 'verbose',
  warn = 'warn',
}

export enum EmojiLogLevels {
  debug = '🟪 debug  ',
  error = '🟥 error  ',
  fatal = '🟥 fatal  ',
  http = '🟫 http   ',
  info = '⬜️ info   ',
  silly = '⬛️ silly  ',
  success = '🟩 success',
  trace = '🟫 trace  ',
  verbose = '🟦 verbose',
  warn = '🟧 warn   ',
}

export const customLevels: AbstractConfigSetLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  success: 4,
  http: 5,
  verbose: 6,
  debug: 7,
  trace: 8,
  silly: 9,
};

export const customColors: AbstractConfigSetColors = {
  debug: 'bold magenta',
  error: 'bold white redBG',
  fatal: 'bold white redBG',
  http: 'bold cyan',
  info: 'bold white',
  silly: 'bold dim white',
  success: 'bold brightGreen',
  trace: 'bold cyan',
  verbose: 'bold blue',
  warn: 'bold yellow',
};

export const colorWrap = ['\x1B[90m', '\x1B[39m'];

export type LogLevel = keyof typeof LogLevels;
