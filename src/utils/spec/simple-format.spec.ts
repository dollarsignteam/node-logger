import { CALLER, DATA, INFO, LogLevels } from '../../constants';
import { CallerInfo, ChangeableInfo, LoggerInfo } from '../../interfaces';
import { simpleFactory } from '../simple-format';

describe('simpleFactory', () => {
  const logInfo: LoggerInfo = {
    timestamp: '2021-06-23T11:44:55.124Z',
    name: 'Logger',
    level: 'debug',
    platform: 'node',
  };
  const callerInfo: CallerInfo = {
    functionName: 'Mock.test',
    absolutePath: '/worker/src/test.ts',
    relativePath: 'src/test.ts',
    fileName: 'test.ts',
    lineNumber: '1',
    columnNumber: '2',
  };

  it('should return message log without caller info', () => {
    const info: ChangeableInfo = {
      level: LogLevels.debug,
      label: '[TEST]',
      message: new Error('foo') as unknown as string,
      [INFO]: logInfo,
    };
    const result = simpleFactory(info);
    expect(result).toBe('2021-06-23T11:44:55.124Z [node] 🟪 DEBUG   [Logger] Error: foo');
  });

  it('should return message log with caller info and single data', () => {
    const info: ChangeableInfo = {
      level: LogLevels.debug,
      label: '[TEST]',
      message: 'data',
      [DATA]: ['foo'],
      [INFO]: logInfo,
      [CALLER]: callerInfo,
    };
    const result = simpleFactory(info);
    expect(result).toBe('2021-06-23T11:44:55.124Z [node] 🟪 DEBUG   [Logger] [src/test.ts:1:2 Mock.test] data - `foo`');
  });

  it('should return message log with caller info and multiple data', () => {
    const caller = { ...callerInfo };
    caller.absolutePath = `@/node_modules/${caller.absolutePath}`;
    const info: ChangeableInfo = {
      level: LogLevels.debug,
      label: '[TEST]',
      message: 'data',
      [DATA]: ['list', [1, 2, 3]],
      [INFO]: logInfo,
      [CALLER]: caller,
    };
    const result = simpleFactory(info);
    expect(result).toBe('2021-06-23T11:44:55.124Z [node] 🟪 DEBUG   [Logger] [Mock.test] data - `["list",[1,2,3]]`');
  });
});
