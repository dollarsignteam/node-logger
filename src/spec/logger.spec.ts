import { join } from 'path';

import { CallerInfo, LoggerOptions } from '../interfaces';
import { Logger } from '../logger';

describe('Logger', () => {
  const opts: LoggerOptions = {
    name: 'TEST',
    level: 'info',
    colorize: false,
    displayDifferentTimestamp: false,
    displayFilePath: false,
    displayFunctionName: false,
  };
  const logger = new Logger(opts);

  it('should be defined', () => {
    const log = new Logger('TEST');
    expect(log).toBeDefined();
    expect(logger).toBeDefined();
  });

  describe('isEnabledColorize', () => {
    beforeEach(() => {
      delete process.env.NODE_ENV;
      delete process.env.LOGGER_COLORIZE;
    });

    it('should return colorize value in options', () => {
      const result = logger.isEnabledColorize({ colorize: true });
      expect(result).toBeTruthy();
    });

    it('should return `false` when `NODE_ENV` is production', () => {
      process.env.NODE_ENV = 'production';
      const result = logger.isEnabledColorize(null);
      expect(result).toBeFalsy();
    });

    it('should return `false` when `LOGGER_COLORIZE` is false', () => {
      process.env.LOGGER_COLORIZE = 'false';
      const result = logger.isEnabledColorize(null);
      expect(result).toBeFalsy();
    });

    it('should return `true` when `LOGGER_COLORIZE` is true and `NODE_ENV` is production', () => {
      process.env.NODE_ENV = 'production';
      process.env.LOGGER_COLORIZE = 'true';
      const result = logger.isEnabledColorize(null);
      expect(result).toBeTruthy();
    });
  });

  describe('getRelativePath', () => {
    it('should return null when input is null', () => {
      const result = Logger.getRelativePath(null);
      expect(result).toBeNull();
    });

    it('should return return relative path string', () => {
      const expected = join('src', 'index.ts');
      const filePath = join(process.cwd(), expected);
      const result = Logger.getRelativePath(filePath);
      expect(result).toBe(expected);
    });
  });

  describe('getCallerInfo', () => {
    beforeEach(() => {
      jest.spyOn(Logger, 'getRelativePath').mockReset();
    });

    it('should return stack info', () => {
      const info = logger.getCallerInfo(-1);
      expect(info).toHaveProperty('functionName');
    });

    it('should return undefined', () => {
      const info = logger.getCallerInfo(1);
      expect(info).toBeUndefined();
    });

    it('should return `Object.<anonymous>` functionName', () => {
      const error = new Error();
      error.stack = `Error:\n\n\nat /Workspace/src/test.ts:1:2`;
      const info: CallerInfo = logger.getCallerInfo(0, error);
      expect(info.functionName).toBe('Object.<anonymous>');
    });
  });

  describe('callLogger', () => {
    it('should call `getCallerInfo`', () => {
      const spyGetCallerInfo = jest.spyOn(logger, 'getCallerInfo').mockReset();
      const result = logger.callLogger('debug', 'message');
      expect(result).toBeDefined();
      expect(spyGetCallerInfo).toHaveBeenCalledWith(1);
    });
  });

  describe('logger method', () => {
    beforeEach(() => {
      jest.spyOn(logger, 'callLogger').mockReset();
    });

    describe('silly', () => {
      it('should call `callLogger`', () => {
        logger.silly('silly message');
        expect(logger.callLogger).toHaveBeenCalledWith('silly', 'silly message');
      });
    });

    describe('trace', () => {
      it('should call `callLogger`', () => {
        logger.trace({ debug: 'true' });
        expect(logger.callLogger).toHaveBeenCalledWith('trace', { debug: 'true' });
      });
    });

    describe('debug', () => {
      it('should call `callLogger`', () => {
        logger.debug({ debug: 'true' });
        expect(logger.callLogger).toHaveBeenCalledWith('debug', { debug: 'true' });
      });
    });

    describe('log', () => {
      it('should call `callLogger`', () => {
        logger.log('log message');
        expect(logger.callLogger).toHaveBeenCalledWith('info', 'log message');
      });
    });

    describe('verbose', () => {
      it('should call `callLogger`', () => {
        logger.verbose('verbose message');
        expect(logger.callLogger).toHaveBeenCalledWith('verbose', 'verbose message');
      });
    });

    describe('http', () => {
      it('should call `callLogger`', () => {
        logger.http('http message');
        expect(logger.callLogger).toHaveBeenCalledWith('http', 'http message');
      });
    });

    describe('info', () => {
      it('should call `callLogger`', () => {
        logger.info('info message');
        expect(logger.callLogger).toHaveBeenCalledWith('info', 'info message');
      });
    });

    describe('success', () => {
      it('should call `callLogger`', () => {
        logger.success('success message');
        expect(logger.callLogger).toHaveBeenCalledWith('success', 'success message');
      });
    });

    describe('warn', () => {
      it('should call `callLogger`', () => {
        logger.warn('warn message');
        expect(logger.callLogger).toHaveBeenCalledWith('warn', 'warn message');
      });
    });

    describe('error', () => {
      it('should call `callLogger`', () => {
        const error = new Error('INTERNAL ERROR');
        logger.error('failed', error);
        expect(logger.callLogger).toHaveBeenCalledWith('error', 'failed', error);
      });
    });

    describe('fatal', () => {
      it('should call `callLogger`', () => {
        const spyExit = jest.spyOn(process, 'exit').mockReset();
        const error = new Error('FATAL ERROR');
        logger.fatal('failed', error);
        expect(logger.callLogger).toHaveBeenCalledWith('fatal', 'failed', error);
        expect(spyExit).toHaveBeenCalledWith(1);
      });
    });
  });
});
