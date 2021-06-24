export enum LogLevels {
  debug = 'debug',
  error = 'error',
  http = 'http',
  info = 'info',
  silly = 'silly',
  verbose = 'verbose',
  warn = 'warn',
}

export enum EmojiLogLevels {
  debug = '🟪 DEBUG  ',
  error = '🟥 ERROR  ',
  http = '🟫 HTTP   ',
  info = '🟩 INFO   ',
  silly = '⬜️ SILLY  ',
  verbose = '🟦 VERBOSE',
  warn = '🟧 WARN   ',
}

export type LogLevel = keyof typeof LogLevels;
