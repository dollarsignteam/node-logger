import { getTimestamp } from '../get-timestamp';

describe('getTimestamp', () => {
  it('should return ISO string format', () => {
    const expected = '2021-06-22T12:15:08.973Z';
    jest.spyOn(Date.prototype, 'toISOString').mockReturnValueOnce(expected);
    const result = getTimestamp();
    expect(result).toBe(expected);
  });

  it('should return custom format', () => {
    const result = getTimestamp('YYYY-MM-DD');
    expect(result).toMatch(/\d{4}-\d{2}-\d{2}/);
  });
});
