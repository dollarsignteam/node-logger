import { join } from 'path';

import { LoggerOptions } from '../interfaces';
import { Logger } from '../logger';

describe('Logger', () => {
  const options: LoggerOptions = { name: 'TEST', level: 'info' };
  const logger = new Logger(options);

  it('should be defined', () => {
    const log = new Logger('TEST');
    expect(log).toBeDefined();
    expect(logger).toBeDefined();
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
  });
});
