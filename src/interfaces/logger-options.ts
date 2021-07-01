import { LogLevel } from '@/constants';

export interface LoggerOptions {
  colorize?: boolean;
  displayDifferentTimestamp?: boolean;
  displayFilePath?: boolean;
  displayFunctionName?: boolean;
  level?: LogLevel;
  name?: string;
  platform?: string;
  timestampFormat?: string;
}
