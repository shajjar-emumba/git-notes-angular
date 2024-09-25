import { TimeagoPipe } from './timeago.pipe';

describe('TimeagoPipe', () => {
  let pipe: TimeagoPipe;

  beforeEach(() => {
    pipe = new TimeagoPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform date to "just now" for current date', () => {
    const now = new Date();
    const result = pipe.transform(now.toISOString());
    expect(result).toBe('Just now');
  });

  it('should transform date to "1 hour ago" for a date 1 hour ago', () => {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const result = pipe.transform(oneHourAgo.toISOString());
    expect(result).toBe('1 hour ago');
  });

  it('should transform date to "2 hours ago" for a date 2 hours ago', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const result = pipe.transform(twoHoursAgo.toISOString());
    expect(result).toBe('2 hours ago');
  });

  it('should transform date to "1 day ago" for a date 1 day ago', () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const result = pipe.transform(oneDayAgo.toISOString());
    expect(result).toBe('1 day ago');
  });

  it('should transform date to "3 days ago" for a date 3 days ago', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const result = pipe.transform(threeDaysAgo.toISOString());
    expect(result).toBe('3 days ago');
  });
});
