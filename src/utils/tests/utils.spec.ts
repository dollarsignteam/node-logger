import { isEmpty, parseJSON, toJSON } from '../utils';

describe('util', () => {
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

  describe('parseJSON', () => {
    it('should return null when input is undefined', () => {
      const result = parseJSON(undefined);
      expect(result).toBeNull();
    });

    it('should return {} when input is `{}`', () => {
      const result = parseJSON('{}');
      expect(result).toEqual({});
    });
  });

  describe('toJSON', () => {
    it.skip('should return null when input is null', () => {
      const result = toJSON(null);
      expect(result).toBeNull();
    });

    it.skip('should return null when input is undefined', () => {
      const result = toJSON(undefined);
      expect(result).toBeNull();
    });
  });
});
