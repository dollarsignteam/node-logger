import 'source-map-support/register';

import { isDisabled, isEnabled, isProduction } from '@dollarsign/utils';
import { basename, sep } from 'path';
import winston from 'winston';

import { CALLER, LogLevels } from '@/constants';
import { CallerInfo, LoggerOptions } from '@/interfaces';
import { createLogger } from '@/utils/create-logger';

export class Logger {
  private logger: winston.Logger;
  private options: LoggerOptions;
  private static cwdList: string[] = process.cwd().split(sep);

  /**
   * @param args - name or logger options
   * @param displayDifferentTimestamp - milliseconds since the previous log
   * @example
   * ```typescript
   *  // create instance
   *  const loggerA = new Logger();
   *  // create instance with name
   *  const loggerB = new Logger('App');
   *  // create instance with `displayDifferentTimestamp`
   *  const loggerC = new Logger('App', true);
   *  // create instance with `LoggerOptions`
   *  const loggerD = new Logger({ name: 'App' });
   * ```
   */
  constructor();
  constructor(name: string);
  constructor(opts: LoggerOptions);
  constructor(name: string, displayDifferentTimestamp: boolean);
  constructor(args?: string | LoggerOptions, displayDifferentTimestamp?: boolean) {
    this.configure(args, displayDifferentTimestamp);
    this.configureWithEnvironment();
    this.logger = createLogger(this.options);
  }

  /**
   * @param args - name or logger options
   * @param displayDifferentTimestamp - milliseconds since the previous log
   */
  private configure(args?: string | LoggerOptions, displayDifferentTimestamp?: boolean): void {
    if (typeof args !== 'string') {
      this.options = { ...this.options, ...args };
    } else {
      this.options = {
        name: args,
        displayDifferentTimestamp,
      };
    }
  }

  /**
   * overwrite default config with environment variable
   */
  private configureWithEnvironment(): void {
    const { LOGGER_DISPLAY_DIFFERENT_TIMESTAMP, LOGGER_DISPLAY_FILE_PATH, LOGGER_DISPLAY_FUNCTION_NAME } = process.env;
    const colorize = this.isEnabledColorize(this.options);
    const displayDifferentTimestamp = this.options.displayDifferentTimestamp ?? !isDisabled(LOGGER_DISPLAY_DIFFERENT_TIMESTAMP);
    const displayFilePath = this.options.displayFilePath ?? !isDisabled(LOGGER_DISPLAY_FILE_PATH);
    const displayFunctionName = this.options.displayFunctionName ?? !isDisabled(LOGGER_DISPLAY_FUNCTION_NAME);
    this.options = { ...this.options, ...{ colorize, displayDifferentTimestamp, displayFilePath, displayFunctionName } };
  }

  /**
   * @param options - logger options
   * @returns true if colorize configured
   */
  public isEnabledColorize(options: LoggerOptions): boolean {
    const { LOGGER_COLORIZE } = process.env;
    if (options?.colorize) {
      return options.colorize;
    }
    if (isProduction() && !isEnabled(LOGGER_COLORIZE)) {
      return false;
    }
    return !isDisabled(LOGGER_COLORIZE);
  }

  /**
   * @param args - multiple log attributes that should be logged out
   * @returns winston logger instance
   */
  public log(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.info, ...args);
  }

  /**
   * @param args - multiple log attributes that should be logged out
   * @returns winston logger instance
   */
  public silly(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.silly, ...args);
  }

  /**
   * @param args - multiple log attributes that should be logged out
   * @returns winston logger instance
   */
  public trace(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.trace, ...args);
  }

  /**
   * @param args - multiple log attributes that should be logged out
   * @returns winston logger instance
   */
  public debug(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.debug, ...args);
  }

  /**
   * @param args - multiple log attributes that should be logged out
   * @returns winston logger instance
   */
  public verbose(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.verbose, ...args);
  }

  /**
   * @param args - multiple log attributes that should be logged out
   * @returns winston logger instance
   */
  public http(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.http, ...args);
  }

  /**
   * @param args - multiple log attributes that should be logged out
   * @returns winston logger instance
   */
  public info(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.info, ...args);
  }

  /**
   * @param args - multiple log attributes that should be logged out
   * @returns winston logger instance
   */
  public success(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.success, ...args);
  }

  /**
   * @param args - multiple log attributes that should be logged out
   * @returns winston logger instance
   */
  public warn(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.warn, ...args);
  }

  /**
   * @param args - multiple log attributes that should be logged out
   * @returns winston logger instance
   */
  public error(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.error, ...args);
  }

  /**
   * Fatal logging and exit process with exit code 1
   * @param args - multiple log attributes that should be logged out
   */
  public fatal(...args: unknown[]): never {
    this.callLogger(LogLevels.fatal, ...args);
    process.exit(1);
  }

  /**
   * @param level - log level `string`
   * @param args - multiple log attributes that should be logged out
   * @returns winston logger instance
   */
  public callLogger(level: string, ...args: unknown[]): winston.Logger {
    const callerInfo = this.getCallerInfo(1);
    const caller = { [CALLER]: callerInfo };
    return this.logger.log.apply(this.logger, [level, ...args, caller]);
  }

  /**
   * @param index - stack index
   * @param error - optional `Error`
   * @returns caller info
   */
  public getCallerInfo(index: number, error?: Error): CallerInfo {
    const stackRegA = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
    const stackRegB = /at\s+()(.*):(\d*):(\d*)/gi;
    const stack = error?.stack || new Error().stack;
    const stackList = stack.split('\n').slice(3);
    const message = stackList[index] || stackList[0];
    const result = stackRegA.exec(message) || stackRegB.exec(message);
    if (result && result.length === 5) {
      return {
        functionName: result[1] || 'Object.<anonymous>',
        absolutePath: result[2],
        relativePath: Logger.getRelativePath(result[2]),
        lineNumber: result[3],
        columnNumber: result[4],
        fileName: basename(result[2]),
      };
    }
  }

  /**
   * @param filePath - absolute file path
   * @returns relative path `string` or `null`
   */
  public static getRelativePath(filePath: string): string | null {
    if (!filePath) {
      return null;
    }
    const subPathList = Object.entries(filePath.split(sep));
    const relativePath = subPathList.reduce((currentPath: string, subPath) => {
      return subPath[1] !== this.cwdList[subPath[0]] ? `${currentPath}${sep}${subPath[1]}` : currentPath;
    }, '');
    return relativePath.substring(1);
  }
}
