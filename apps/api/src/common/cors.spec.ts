import { configureCors } from '../main';

describe('CORS Configuration', () => {
  const allowedOrigins = ['http://localhost:3000', 'https://app.serveflow.in'];
  const corsOptions = configureCors(allowedOrigins);

  it('should allow requests matching an allowed origin', (done) => {
    corsOptions.origin('http://localhost:3000', (err, allow) => {
      expect(err).toBeNull();
      expect(allow).toBe(true);
      done();
    });
  });

  it('should allow another configured allowed origin', (done) => {
    corsOptions.origin('https://app.serveflow.in', (err, allow) => {
      expect(err).toBeNull();
      expect(allow).toBe(true);
      done();
    });
  });

  it('should reject unauthorized cross-origin requests', (done) => {
    corsOptions.origin('https://malicious-attacker.com', (err, allow) => {
      expect(err).toBeInstanceOf(Error);
      expect(err?.message).toContain('CORS blocked request');
      expect(allow).toBe(false);
      done();
    });
  });

  it('should allow requests with no origin (e.g. server-to-server or mobile native clients)', (done) => {
    corsOptions.origin(undefined, (err, allow) => {
      expect(err).toBeNull();
      expect(allow).toBe(true);
      done();
    });
  });

  it('should enforce credentials: true and safe allowed methods', () => {
    expect(corsOptions.credentials).toBe(true);
    expect(corsOptions.methods).toContain('GET');
    expect(corsOptions.methods).toContain('POST');
    expect(corsOptions.methods).toContain('OPTIONS');
  });
});
