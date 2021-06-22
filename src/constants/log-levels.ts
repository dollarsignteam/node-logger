export enum LogLevels {
  debug = 'debug',
  error = 'error',
  http = 'http',
  info = 'info',
  silly = 'silly',
  verbose = 'verbose',
  warn = 'warn',
}

export type LogLevel = keyof typeof LogLevels;
