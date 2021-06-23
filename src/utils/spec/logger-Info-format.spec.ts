import { CALLER, INFO, LEVEL, SPLAT } from '../../constants';
import { CallerInfo, ChangeableInfo, LoggerOptions } from '../../interfaces';
import { loggerInfoFactory, loggerInfoFormat } from '../logger-Info-format';

describe('loggerInfoFactory', () => {
  it('should return info without `SPLAT`', () => {
    const info: ChangeableInfo = {
      level: 'debug',
      message: 'message',
      [LEVEL]: 'debug',
    };
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
      [CALLER]: {},
    });
  });

  it('should return info with `SPLAT` include string', () => {
    const info: ChangeableInfo = {
      level: 'debug',
      message: 'message',
      [LEVEL]: 'debug',
      [SPLAT]: ['message'],
    };
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
      [SPLAT]: ['message'],
      [CALLER]: {},
    });
  });

  it('should return info with `SPLAT` include `CALLER`', () => {
    const callerInfo: CallerInfo = {
      functionName: 'Mock.test',
      absolutePath: '/worker/src/test.ts',
      relativePath: 'src/test.ts',
      fileName: 'test.ts',
      lineNumber: '1',
      columnNumber: '2',
    };
    const info: ChangeableInfo = {
      level: 'debug',
      message: 'message',
      [LEVEL]: 'debug',
      [SPLAT]: [{ [CALLER]: callerInfo }],
    };
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
      [SPLAT]: [],
      [CALLER]: callerInfo,
    });
  });
});

describe('loggerInfoFormat', () => {
  it('should return logger info format', () => {
    const result = loggerInfoFormat();
    expect(result).toBeDefined();
  });
});
