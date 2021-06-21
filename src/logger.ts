import { createWinstonLogger } from '@utils/winston';
import path, { join } from 'path';
import winston from 'winston';

import { LoggerOptions, LogLevel } from '@/constants';
import { StackInfo } from '@/interfaces';

const PROJECT_ROOT = join(__dirname, '..');

export class Logger {
  private logger: winston.Logger;

  constructor(options?: LoggerOptions) {
    this.logger = createWinstonLogger(options);
  }

  /**
   * @param {?} args multiple log attributes that should be logged out
   * @returns {winston.Logger} winston logger instance
   */
  public log(level: LogLevel, ...args: unknown[]): winston.Logger {
    return this.callLogger(level, ...args);
  }

  /**
   * @param {?} args multiple log attributes that should be logged out
   * @returns {winston.Logger} winston logger instance
   */
  public debug(...args: unknown[]): winston.Logger {
    return this.callLogger('debug', ...args);
  }

  /**
   * @param {string} level log level `string`
   * @param {?} args multiple log attributes that should be logged out
   * @returns {winston.Logger} winston logger instance
   */
  private callLogger(level: string, ...args: unknown[]): winston.Logger {
    const formatArgs = this.formatArguments(args);
    return this.logger.log.apply(this.logger, [level, ...formatArgs]);
  }

  /**
   * @param {unknown} args log arguments
   * @returns {unknown} args with callSite info
   */
  private formatArguments(args: unknown[]): unknown[] {
    args = Array.prototype.slice.call(args);
    const stackInfo = this.getStackInfo(2);
    if (stackInfo) {
      const { relativePath, lineNumber, columnNumber, method } = stackInfo;
      const callSite = `(${relativePath}:${lineNumber}:${columnNumber} ${method})`;
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
  private getStackInfo(index: number): StackInfo {
    const stackRegA = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
    const stackRegB = /at\s+()(.*):(\d*):(\d*)/gi;
    const stackList = new Error().stack.split('\n').slice(3);
    const stack = stackList[index] || stackList[0];
    const result = stackRegA.exec(stack) || stackRegB.exec(stack);
    if (result && result.length === 5) {
      return {
        method: result[1],
        absolutePath: result[2],
        relativePath: path.relative(PROJECT_ROOT, result[2]),
        lineNumber: result[3],
        columnNumber: result[4],
        fileName: path.basename(result[2]),
        stack: stackList.join('\n'),
      };
    }
  }
}
