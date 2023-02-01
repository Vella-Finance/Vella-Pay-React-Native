/* eslint-disable prefer-const */
import {
  isNegative,
  toNumber,
} from './helper';

describe('Utility functions work properly', () => {
  test('toNumber should convert string amount to number ', () => {
    const result = toNumber('2500.00');
    expect(result).toBe(2500);
  });
  test('isNegative should return true if amount is negative ', () => {
    let result = isNegative('-200.00');
    expect(result).toBe(true);

    result = isNegative(-200.0);
    expect(result).toBe(true);

    result = isNegative(200.0);
    expect(result).toBe(false);
  });
});
