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
      const options: LoggerOptions = {
        level: 'warn',
        name: 'TEST',
        platform: 'node',
      };
      const logger = createLogger(options);
      expect(logger.level).toBe(LogLevels.warn);
    });
  });
});
