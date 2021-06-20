import { LogLevels } from './log-levels';

export interface LoggerOptions {
  level?: keyof typeof LogLevels;
  name?: string;
  platform?: string;
}
