import { CALLER, DATA, INFO, LogLevels } from '../../constants';
import { CallerInfo, ChangeableInfo, LoggerInfo } from '../../interfaces';
import { getDataInfo, getMessage, simpleFactory } from '../simple-format';

describe('getMessage', () => {
  it('should return message', () => {
    const result = getMessage('foo', false);
    expect(result).toBe('foo');
  });

  it('should return message with color wrap', () => {
    const msg = 'foo';
    const result = getMessage('foo', true);
    expect(result).toBe(`\x1B[90m${msg}\x1B[39m`);
  });
});

describe('getDataInfo', () => {
  it('should return `null` string with input is null', () => {
    const result = getDataInfo(null);
    expect(result).toBe('`null`');
  });

  it('should return single data info', () => {
    const result = getDataInfo(['foo']);
    expect(result).toBe('`foo`');
  });

  it('should return list data info', () => {
    const result = getDataInfo(['foo', 'bar']);
    expect(result).toBe('`["foo","bar"]`');
  });
});

describe('simpleFactory', () => {
  const logInfo: LoggerInfo = {
    timestamp: '2021-06-23T11:44:55.124Z',
    name: 'Logger',
    level: 'debug',
    platform: 'node',
    colorize: false,
    displayFilePath: true,
    displayFunctionName: true,
  };
  const callerInfo: CallerInfo = {
    functionName: 'Mock.test',
    absolutePath: '/worker/src/test.ts',
    relativePath: 'src/test.ts',
    fileName: 'test.ts',
    lineNumber: '1',
    columnNumber: '2',
  };

  it('should return message log without ms info', () => {
    const info: ChangeableInfo = {
      level: LogLevels.debug,
      label: '[TEST]',
      ms: '+1ms',
      message: 'foo',
      [INFO]: logInfo,
    };
    const result = simpleFactory(info);
    expect(result).toBe('2021-06-23T11:44:55.124Z [node] 🟪 DEBUG   [Logger] foo +1ms');
  });

  it('should return message log without caller info', () => {
    const info: ChangeableInfo = {
      level: LogLevels.debug,
      label: '[TEST]',
      message: new Error('foo') as unknown as string,
      [INFO]: logInfo,
    };
    const result = simpleFactory(info);
    expect(result).toBe('2021-06-23T11:44:55.124Z [node] 🟪 DEBUG   [Logger] [Error: foo]');
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

  it('should return message log without file path and function name', () => {
    const caller = { ...callerInfo };
    caller.absolutePath = `@/node_modules/${caller.absolutePath}`;
    const info: ChangeableInfo = {
      level: LogLevels.debug,
      label: '[TEST]',
      message: 'foo',
      [CALLER]: caller,
      [INFO]: { ...logInfo, displayFilePath: true, displayFunctionName: false },
    };
    const result = simpleFactory(info);
    expect(result).toBe('2021-06-23T11:44:55.124Z [node] 🟪 DEBUG   [Logger] foo');
  });

  it('should return message log without function name', () => {
    const info: ChangeableInfo = {
      level: LogLevels.debug,
      label: '[TEST]',
      message: 'foo',
      [CALLER]: callerInfo,
      [INFO]: { ...logInfo, displayFunctionName: false },
    };
    const result = simpleFactory(info);
    expect(result).toBe('2021-06-23T11:44:55.124Z [node] 🟪 DEBUG   [Logger] [src/test.ts:1:2] foo');
  });
});
