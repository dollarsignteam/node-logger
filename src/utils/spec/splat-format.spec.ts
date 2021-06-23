import { DATA, SPLAT } from '../../constants';
import { ChangeableInfo, SplatterOptions } from '../../interfaces';
import { splatFormat, Splatter } from '../splat-format';

describe('Splatter', () => {
  let splatter: Splatter;
  let splatterWithOptions: Splatter;

  beforeAll(() => {
    const opts: SplatterOptions = { displayData: false };
    splatter = new Splatter();
    splatterWithOptions = new Splatter(opts);
  });

  it('should be defined', () => {
    expect(splatter).toBeDefined();
  });

  describe('splat', () => {
    it('should return modified info message', () => {
      const info: ChangeableInfo = {
        level: 'debug',
        message: 'foo: %s',
        [SPLAT]: ['bar', 'demo'],
      };
      const token = ['%s'];
      const result = splatter.splat(info, token);
      expect(result).toEqual({
        data: ['demo'],
        level: 'debug',
        message: 'foo: bar',
        [SPLAT]: ['bar'],
        [DATA]: ['demo'],
      });
    });

    it('should return modified info message without `SPLAT`', () => {
      const info: ChangeableInfo = {
        level: 'debug',
        message: 'foo: %%s',
      };
      const token = ['%%'];
      const result = splatter.splat(info, token);
      expect(result).toEqual({
        level: 'debug',
        message: 'foo: %%s',
        [DATA]: [],
      });
    });
  });

  describe('transform', () => {
    it('should return info', () => {
      const info: ChangeableInfo = {
        level: 'debug',
        message: 'foo',
      };
      const result = splatter.transform(info);
      expect(result).toEqual({
        level: 'debug',
        message: 'foo',
      });
    });

    it('should return info without `DATA`', () => {
      const info: ChangeableInfo = {
        level: 'debug',
        message: 'foo',
        [SPLAT]: ['bar', 'demo'],
      };
      const result = splatterWithOptions.transform(info);
      expect(result).toEqual({
        level: 'debug',
        message: 'foo',
        [SPLAT]: [],
        [DATA]: ['bar', 'demo'],
      });
    });

    it('should return info with `DATA` and `SPLAT', () => {
      const info: ChangeableInfo = {
        level: 'debug',
        message: 'foo',
        [SPLAT]: ['bar'],
      };
      const result = splatter.transform(info);
      expect(result).toEqual({
        data: ['bar'],
        level: 'debug',
        message: 'foo',
        [SPLAT]: ['bar'],
        [DATA]: ['bar'],
      });
    });

    it('should return info with `SPLAT`', () => {
      const info: ChangeableInfo = {
        level: 'debug',
        message: 'foo: %s 100%%',
        [SPLAT]: ['bar'],
      };
      const result = splatter.transform(info);
      expect(result).toEqual({
        level: 'debug',
        message: 'foo: bar 100%',
        [SPLAT]: ['bar'],
        [DATA]: [],
      });
    });
  });
});

describe('splatFormat', () => {
  it('should return `Splatter` instance', () => {
    const splat = splatFormat();
    expect(splat).toBeInstanceOf(Splatter);
  });
});
