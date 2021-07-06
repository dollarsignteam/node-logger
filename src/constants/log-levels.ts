import { AbstractConfigSetColors, AbstractConfigSetLevels } from 'winston/lib/winston/config';

export enum LogLevels {
  debug = 'debug',
  error = 'error',
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
  http = '🟫 http   ',
  info = '⬜️ info   ',
  silly = '⬛️ silly  ',
  success = '🟩 success',
  trace = '🟫 trace  ',
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
  trace: 7,
  silly: 8,
};

export const customColors: AbstractConfigSetColors = {
  debug: 'bold magenta',
  error: 'bold white redBG',
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
