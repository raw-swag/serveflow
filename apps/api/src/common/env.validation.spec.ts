import { validateEnv } from './env.validation';

describe('Environment Validation', () => {
  it('should pass with valid environment variables', () => {
    const valid = {
      NODE_ENV: 'development',
      PORT: '4000',
      CORS_ORIGINS: 'http://localhost:3000,http://localhost:4000',
      API_PREFIX: '/api/v1',
      APP_NAME: 'ServeFlow API',
    };

    const res = validateEnv(valid);
    expect(res.NODE_ENV).toBe('development');
    expect(res.PORT).toBe(4000);
    expect(res.CORS_ORIGINS).toEqual(['http://localhost:3000', 'http://localhost:4000']);
  });

  it('should apply safe defaults when optional variables are omitted', () => {
    const minimal = {};
    const res = validateEnv(minimal);

    expect(res.NODE_ENV).toBe('development');
    expect(res.PORT).toBe(4000);
    expect(res.CORS_ORIGINS).toEqual(['http://localhost:3000', 'http://localhost:4000']);
    expect(res.API_PREFIX).toBe('/api/v1');
  });

  it('should fail when PORT is not a valid number', () => {
    const invalid = {
      PORT: 'invalid-port',
    };

    expect(() => validateEnv(invalid)).toThrow('PORT must be a valid port number');
  });

  it('should fail when PORT is out of range', () => {
    const invalid = {
      PORT: '999999',
    };

    expect(() => validateEnv(invalid)).toThrow('PORT must be a valid port number');
  });

  it('should fail when NODE_ENV is not one of development, production, test', () => {
    const invalid = {
      NODE_ENV: 'staging-unknown',
    };

    expect(() => validateEnv(invalid)).toThrow('ServeFlow Env Validation Error');
  });
});
