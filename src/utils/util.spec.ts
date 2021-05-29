import { isEmpty } from './util';

describe('isEmpty', () => {
  test('null is empty', () => {
    const result = isEmpty(null);
    expect(result).toBeTruthy();
  });

  test('`` is empty', () => {
    const result = isEmpty('');
    expect(result).toBeTruthy();
  });

  test('undefined is empty', () => {
    const result = isEmpty(undefined);
    expect(result).toBeTruthy();
  });

  test('empty object is empty', () => {
    const result = isEmpty({});
    expect(result).toBeTruthy();
  });

  test('`foo` is not empty', () => {
    const result = isEmpty('foo');
    expect(result).toBeFalsy();
  });
});
