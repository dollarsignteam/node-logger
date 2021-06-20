import path from 'path';

import { createLogger } from './utils/logger';
const PROJECT_ROOT = path.join(__dirname, '..');

const logger = createLogger();

// A custom logger interface that wraps winston, making it easy to instrument
// code and still possible to replace winston in the future.

export const debug = function (...args: unknown[]): void {
  const formatArgs = formatLogArguments(args);
  // logger.debug.apply(logger, formatArgs);
  logger.debug(formatArgs);
};

/**
 * Attempts to add file and line number info to the given log arguments.
 */
function formatLogArguments(args: unknown[]): unknown[] {
  args = Array.prototype.slice.call(args);
  const stackInfo = getStackInfo(1);
  if (stackInfo) {
    // get file path relative to project root
    const calleeStr = '(' + stackInfo.relativePath + ':' + stackInfo.line + ')';
    if (typeof args[0] === 'string') {
      args[0] = calleeStr + ' ' + args[0];
    } else {
      args.unshift(calleeStr);
    }
  }
  return args;
}

/**
 * Parses and returns info about the call stack at the given index.
 */
function getStackInfo(stackIndex: number): Record<string, unknown> {
  const stackList = new Error().stack.split('\n').slice(3);
  const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
  const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;
  const s = stackList[stackIndex] || stackList[0];
  const sp = stackReg.exec(s) || stackReg2.exec(s);
  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      relativePath: path.relative(PROJECT_ROOT, sp[2]),
      line: sp[3],
      pos: sp[4],
      file: path.basename(sp[2]),
      stack: stackList.join('\n'),
    };
  }
}
