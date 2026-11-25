import { validateEnv } from './env.validation';

describe('Environment Validation', () => {
  it('should pass with valid environment variables', () => {
    const valid = {
      NODE_ENV: 'development',
      PORT: '4000',
      CORS_ORIGINS: 'http://localhost:3000,https://app.serveflow.in',
      API_PREFIX: '/api/v1',
      APP_NAME: 'ServeFlow API',
    };

    const res = validateEnv(valid);
    expect(res.NODE_ENV).toBe('development');
    expect(res.PORT).toBe(4000);
    expect(res.CORS_ORIGINS).toEqual(['http://localhost:3000', 'https://app.serveflow.in']);
  });

  it('should apply safe defaults when optional variables are omitted', () => {
    const minimal = {};
    const res = validateEnv(minimal);

    expect(res.NODE_ENV).toBe('development');
    expect(res.PORT).toBe(4000);
    expect(res.CORS_ORIGINS).toEqual(['http://localhost:3000', 'http://localhost:4000']);
    expect(res.API_PREFIX).toBe('/api/v1');
  });

  it('should reject PORT with alphanumeric characters (e.g., 4000abc)', () => {
    const invalid = { PORT: '4000abc' };
    expect(() => validateEnv(invalid)).toThrow('PORT must be a positive integer');
  });

  it('should reject decimal PORT values (e.g., 4000.5)', () => {
    const invalid = { PORT: '4000.5' };
    expect(() => validateEnv(invalid)).toThrow('PORT must be a positive integer');
  });

  it('should reject PORT values out of range (0 or > 65535)', () => {
    expect(() => validateEnv({ PORT: '0' })).toThrow('PORT must be a valid port number');
    expect(() => validateEnv({ PORT: '70000' })).toThrow('PORT must be a valid port number');
  });

  it('should reject wildcard origins (*) in CORS_ORIGINS', () => {
    const invalid = { CORS_ORIGINS: '*' };
    expect(() => validateEnv(invalid)).toThrow('CORS_ORIGINS must be a comma-separated list of valid HTTP/HTTPS origins');
  });

  it('should reject malformed CORS origins with paths, query params, or credentials', () => {
    expect(() => validateEnv({ CORS_ORIGINS: 'http://localhost:3000/api' })).toThrow('CORS_ORIGINS');
    expect(() => validateEnv({ CORS_ORIGINS: 'https://user:pass@serveflow.in' })).toThrow('CORS_ORIGINS');
    expect(() => validateEnv({ CORS_ORIGINS: 'https://serveflow.in?query=1' })).toThrow('CORS_ORIGINS');
    expect(() => validateEnv({ CORS_ORIGINS: 'ftp://serveflow.in' })).toThrow('CORS_ORIGINS');
    expect(() => validateEnv({ CORS_ORIGINS: 'not-a-url' })).toThrow('CORS_ORIGINS');
  });
});
