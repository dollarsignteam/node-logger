import 'source-map-support/register';

import { basename, sep } from 'path';
import winston from 'winston';

import { CALLER, LogLevels } from '@/constants';
import { CallerInfo, LoggerOptions } from '@/interfaces';
import { createLogger } from '@/utils/create-logger';

export class Logger {
  private logger: winston.Logger;
  public static cwdArray: string[] = process.cwd().split(sep);

  constructor(opts?: LoggerOptions | string) {
    if (typeof opts == 'string') {
      opts = { name: opts };
    }
    this.logger = createLogger(opts);
  }

  /**
   * @param {?} args multiple log attributes that should be logged out
   * @returns {winston.Logger} winston logger instance
   */
  public log(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.info, ...args);
  }

  /**
   * @param {?} args multiple log attributes that should be logged out
   * @returns {winston.Logger} winston logger instance
   */
  public silly(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.silly, ...args);
  }

  /**
   * @param {?} args multiple log attributes that should be logged out
   * @returns {winston.Logger} winston logger instance
   */
  public debug(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.debug, ...args);
  }

  /**
   * @param {?} args multiple log attributes that should be logged out
   * @returns {winston.Logger} winston logger instance
   */
  public verbose(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.verbose, ...args);
  }

  /**
   * @param {?} args multiple log attributes that should be logged out
   * @returns {winston.Logger} winston logger instance
   */
  public http(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.http, ...args);
  }

  /**
   * @param {?} args multiple log attributes that should be logged out
   * @returns {winston.Logger} winston logger instance
   */
  public info(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.info, ...args);
  }

  /**
   * @param {?} args multiple log attributes that should be logged out
   * @returns {winston.Logger} winston logger instance
   */
  public success(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.success, ...args);
  }

  /**
   * @param {?} args multiple log attributes that should be logged out
   * @returns {winston.Logger} winston logger instance
   */
  public warn(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.warn, ...args);
  }

  /**
   * @param {?} args multiple log attributes that should be logged out
   * @returns {winston.Logger} winston logger instance
   */
  public error(...args: unknown[]): winston.Logger {
    return this.callLogger(LogLevels.error, ...args);
  }

  /**
   * @param {string} level log level `string`
   * @param {?} args multiple log attributes that should be logged out
   * @returns {winston.Logger} winston logger instance
   */
  public callLogger(level: string, ...args: unknown[]): winston.Logger {
    const callerInfo = this.getCallerInfo(1);
    const caller = { [CALLER]: callerInfo };
    return this.logger.log.apply(this.logger, [level, ...args, caller]);
  }

  /**
   * @param {number} index stack index
   * @param {Error} error optional `Error`
   * @returns {CallerInfo} caller info
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
   * @param {string} filePath absolute file path
   * @returns {string | null} relative path `string` or `null`
   */
  public static getRelativePath(filePath: string): string | null {
    if (!filePath) {
      return null;
    }
    const subPathList = Object.entries(filePath.split(sep));
    const relativePath = subPathList.reduce((currentPath: string, subPath) => {
      return subPath[1] !== this.cwdArray[subPath[0]] ? `${currentPath}${sep}${subPath[1]}` : currentPath;
    }, '');
    return relativePath.substring(1);
  }
}
