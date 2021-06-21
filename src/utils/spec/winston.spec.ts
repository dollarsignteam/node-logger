import { TransformableInfo } from 'logform';

import { LoggerOptions, LogLevels } from '../../constants';
import { createWinstonLogger, templateFactory } from '../winston';

describe('winston', () => {
  describe('createWinstonLogger', () => {
    it('should return default logger', () => {
      const logger = createWinstonLogger();
      expect(logger.level).toBe(LogLevels.silly);
    });

    it('should return custom logger', () => {
      const options: LoggerOptions = {
        level: 'warn',
        name: 'TEST',
        platform: 'node',
      };
      const logger = createWinstonLogger(options);
      expect(logger.level).toBe(LogLevels.warn);
    });
  });

  describe('templateFactory', () => {
    it('should return string with `data`', () => {
      const info: TransformableInfo = {
        level: LogLevels.debug,
        label: '[TEST]',
        message: 'foo',
        ...{ foo: 'bar' },
      };
      const template = templateFactory(info);
      expect(template).toBe('[TEST] debug: foo - `{"foo":"bar"}`');
    });

    it('should return string with out `data`', () => {
      const info: TransformableInfo = {
        level: LogLevels.debug,
        label: '[TEST]',
        message: 'foo',
      };
      const template = templateFactory(info);
      expect(template).toBe('[TEST] debug: foo');
    });
  });
});
