import { TransformableInfo } from 'logform';

import { LogLevels } from '../../constants';
import { simpleFactory } from '../simple-format';

describe('winston', () => {
  describe('simpleFactory', () => {
    it('should return string with `data`', () => {
      const info: TransformableInfo = {
        level: LogLevels.debug,
        label: '[TEST]',
        message: 'foo',
        ...{ foo: 'bar' },
      };
      const template = simpleFactory(info);
      expect(template).toBe('[TEST] debug: foo - `{"foo":"bar"}`');
    });

    it('should return string with out `data`', () => {
      const info: TransformableInfo = {
        level: LogLevels.debug,
        label: '[TEST]',
        message: 'foo',
      };
      const template = simpleFactory(info);
      expect(template).toBe('[TEST] debug: foo');
    });
  });
});
