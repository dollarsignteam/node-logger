import { LogLevel } from '@/constants';

export interface LoggerOptions {
  colorize?: boolean;
  level?: LogLevel;
  name?: string;
  platform?: string;
  timestampFormat?: string;
}
