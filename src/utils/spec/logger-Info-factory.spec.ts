import { TransformableInfo } from 'logform';

import { Info, Level } from '../../constants';
import { LoggerOptions } from '../../interfaces';
import { loggerInfoFactory } from '../logger-Info-factory';

describe('loggerInfoFactory', () => {
  const info: TransformableInfo = {
    level: 'debug',
    message: 'message',
    [Level]: 'debug',
  };

  it('should return default logger information', () => {
    const result = loggerInfoFactory(info, null);
    expect(result).toEqual({
      level: 'debug',
      message: 'message',
      [Level]: 'debug',
      [Info]: {
        level: 'debug',
        name: 'Logger',
        platform: 'node',
        timestamp: expect.anything(),
      },
    });
  });

  it('should return logger information', () => {
    const opts: LoggerOptions = {
      name: 'TEST',
      platform: 'logger',
      timestampFormat: 'YYYY-MM-DD HH:mm:ss',
    };
    const result = loggerInfoFactory(info, opts);
    expect(result).toEqual({
      level: 'debug',
      message: 'message',
      [Level]: 'debug',
      [Info]: {
        level: 'debug',
        name: 'TEST',
        platform: 'logger',
        timestamp: expect.anything(),
      },
    });
  });
});
