import { cx } from './cx';

describe('cx', () => {
  it('joins truty class names', () => {
    expect(cx('one', undefined, false, 'two')).toBe('one two');
  });
});
