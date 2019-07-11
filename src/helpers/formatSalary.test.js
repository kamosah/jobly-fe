import formatSalary from './formatSalary';

describe('formatSalary', function() {
  it('It formats salary', function() {
    expect(formatSalary(20000)).toBe('$20,000');
    expect(formatSalary(120000)).toBe('$120,000');
    expect(formatSalary(2220000)).toBe('$2,220,000');
  });
});