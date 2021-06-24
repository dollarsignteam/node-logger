import { getTimestamp } from '../get-timestamp';

describe('getTimestamp', () => {
  it('should return `YYYY-MM-DD HH:mm:ss.SSS Z` string format', () => {
    const result = getTimestamp();
    expect(result).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3} \+\d{2}:\d{2}/);
  });

  it('should return custom format', () => {
    const result = getTimestamp('YYYY-MM-DD');
    expect(result).toMatch(/\d{4}-\d{2}-\d{2}/);
  });
});
