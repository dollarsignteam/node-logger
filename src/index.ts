import { createLogger } from '@utils/logger';
import path, { join } from 'path';
import winston from 'winston';

import { StackInfo } from '@/interfaces';

const PROJECT_ROOT = join(__dirname, '..');

export class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = createLogger();
  }

  /**
   * Logs a debug message.
   * @param args  - Multiple log attributes that should be logged out.
   */
  public debug(...args: unknown[]): winston.LeveledLogMethod {
    return this.logger.debug.apply(this.logger, ...this.formatArguments(args));
  }

  /**
   * @param {unknown} args log arguments
   * @returns {unknown} args with callSite info
   */
  private formatArguments(args: unknown[]): unknown[] {
    args = Array.prototype.slice.call(args);
    const stackInfo = this.getStackInfo(1);
    if (stackInfo) {
      const { relativePath, lineNumber, columnNumber, method } = stackInfo;
      const callSite = `(${relativePath}:${lineNumber}:${columnNumber} ${method})`;
      console.log(args);
      if (typeof args[-1] === 'string') {
        args[-1] = callSite + ' ' + args[0];
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
