import { LogLevel } from '@/constants';

export interface LoggerOptions {
  level?: LogLevel;
  name?: string;
  platform?: string;
  timestampFormat?: string;
}
