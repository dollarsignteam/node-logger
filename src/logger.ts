import 'source-map-support/register';

import { createWinstonLogger } from '@utils/winston';
import { basename, sep } from 'path';
import winston from 'winston';

import { LoggerOptions, LogLevels } from '@/constants';
import { StackInfo } from '@/interfaces';

export class Logger {
  private logger: winston.Logger;
  public static cwdArray: string[] = process.cwd().split(sep);

  constructor(options?: LoggerOptions | string) {
    if (typeof options == 'string') {
      options = { name: options };
    }
    this.logger = createWinstonLogger(options);
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
    const formatArgs = this.updateArguments(args);
    return this.logger.log.apply(this.logger, [level, ...formatArgs]);
  }

  /**
   * @param {unknown} args log arguments
   * @returns {unknown} args with callSite info
   */
  public updateArguments(args: unknown[]): unknown[] {
    args = Array.prototype.slice.call(args);
    const stackInfo = this.getStackInfo(2);
    if (stackInfo) {
      const { relativePath, lineNumber, columnNumber, method } = stackInfo;
      const callerName = method || '<anonymous>';
      const callSite = `(${relativePath}:${lineNumber}:${columnNumber} ${callerName})`;
      if (typeof args[0] === 'string') {
        args[0] = `${callSite} ${args[0]}`;
      } else {
        args.unshift(callSite);
      }
    }
    return args;
  }

  /**
   * @param {number} index stack index
   * @returns {StackInfo} call stack info
   */
  public getStackInfo(index: number): StackInfo {
    const stackRegA = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
    const stackRegB = /at\s+()(.*):(\d*):(\d*)/gi;
    const stackList = new Error().stack.split('\n').slice(3);
    const stack = stackList[index] || stackList[0];
    const result = stackRegA.exec(stack) || stackRegB.exec(stack);
    if (result && result.length === 5) {
      return {
        method: result[1],
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
