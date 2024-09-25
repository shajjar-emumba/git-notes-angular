import { EmailtoDisplayNamePipe } from './emailto-display-name.pipe';

describe('EmailtoDisplayNamePipe', () => {
  let pipe: EmailtoDisplayNamePipe;
  beforeEach(() => {
    pipe = new EmailtoDisplayNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform email to display name', () => {
    const email = 'muhammad.shajjar@example.com';
    const displayName = pipe.transform(email);
    expect(displayName).toBe('Muhammad Shajjar');
  });

  it('should return empty string if email is empty', () => {
    const email = '';
    const displayName = pipe.transform(email);
    expect(displayName).toBe('');
  });

  it('should handle email without dot in the name', () => {
    const email = 'muhammadshajjar@example.com';
    const displayName = pipe.transform(email);
    expect(displayName).toBe('Muhammadshajjar');
  });

  it('should handle email with multiple dots in the name', () => {
    const email = 'raja.muhammad.shajjar@example.com';
    const displayName = pipe.transform(email);
    expect(displayName).toBe('Raja Muhammad Shajjar');
  });
});
