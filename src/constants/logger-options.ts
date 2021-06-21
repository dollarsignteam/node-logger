import { LogLevel } from './log-levels';

export interface LoggerOptions {
  level?: LogLevel;
  name?: string;
  platform?: string;
}
