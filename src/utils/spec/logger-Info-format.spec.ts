import { INFO, LEVEL } from '../../constants';
import { ChangeableInfo, LoggerOptions } from '../../interfaces';
import { loggerInfoFactory } from '../logger-Info-format';

describe('loggerInfoFactory', () => {
  const info: ChangeableInfo = {
    level: 'debug',
    message: 'message',
    [LEVEL]: 'debug',
  };

  it('should return default logger information', () => {
    const result = loggerInfoFactory(info, null);
    expect(result).toEqual({
      level: 'debug',
      message: 'message',
      [LEVEL]: 'debug',
      [INFO]: {
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
      [LEVEL]: 'debug',
      [INFO]: {
        level: 'debug',
        name: 'TEST',
        platform: 'logger',
        timestamp: expect.anything(),
      },
    });
  });
});
