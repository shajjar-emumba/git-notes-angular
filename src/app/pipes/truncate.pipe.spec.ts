import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the original string if its length is less than the limit', () => {
    const value = 'Short string';
    const result = pipe.transform(value, 20);
    expect(result).toBe(value);
  });

  it('should truncate the string and add ellipsis if its length is greater than the limit', () => {
    const value = 'This is a very long string that needs to be truncated';
    const result = pipe.transform(value, 20);
    expect(result).toBe('This is a very long ...');
  });

  it('should use the provided ellipsis if specified', () => {
    const value = 'This is a very long string that needs to be truncated';
    const result = pipe.transform(value, 20, '***');
    expect(result).toBe('This is a very long ***');
  });

  it('should handle empty string input', () => {
    const value = '';
    const result = pipe.transform(value, 20);
    expect(result).toBe('');
  });
});
