import { LogLevels } from '../../constants';
import { LoggerOptions } from '../../interfaces';
import { createLogger } from '../create-logger';

describe('winston', () => {
  describe('createLogger', () => {
    it('should return default logger', () => {
      const logger = createLogger();
      expect(logger.level).toBe(LogLevels.silly);
    });

    it('should return custom logger', () => {
      const opts: LoggerOptions = {
        level: 'warn',
        name: 'TEST',
        platform: 'node',
      };
      const logger = createLogger(opts);
      expect(logger.level).toBe(LogLevels.warn);
    });
  });
});
