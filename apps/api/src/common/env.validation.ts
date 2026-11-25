import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .default('4000')
    .refine((val) => /^\d+$/.test(val), {
      message: 'PORT must be a positive integer without letters, symbols, or decimals',
    })
    .transform((val) => parseInt(val, 10))
    .refine((port) => port >= 1 && port <= 65535, {
      message: 'PORT must be a valid port number between 1 and 65535',
    }),
  CORS_ORIGINS: z
    .string()
    .default('http://localhost:3000,http://localhost:4000')
    .transform((val) =>
      val
        .split(',')
        .map((origin) => origin.trim())
        .filter((origin) => origin.length > 0)
    )
    .refine(
      (origins) => {
        if (origins.length === 0) return false;
        // Strictly validate each origin as a valid http/https origin without path, query, or credentials
        for (const origin of origins) {
          if (origin === '*') return false; // Strictly disallow wildcard in CORS_ORIGINS
          try {
            const parsed = new URL(origin);
            if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
            if (parsed.pathname !== '' && parsed.pathname !== '/') return false;
            if (parsed.search || parsed.hash || parsed.username || parsed.password) return false;
          } catch {
            return false;
          }
        }
        return true;
      },
      {
        message:
          'CORS_ORIGINS must be a comma-separated list of valid HTTP/HTTPS origins without paths, query parameters, wildcards (*), or credentials',
      }
    ),
  API_PREFIX: z.string().default('/api/v1'),
  APP_NAME: z.string().default('ServeFlow API'),
});

export type ValidatedEnv = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): ValidatedEnv {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    const errorDetails = result.error.errors
      .map((err) => `  - ${err.path.join('.')}: ${err.message}`)
      .join('\n');
    throw new Error(`\n❌ [ServeFlow Env Validation Error]:\n${errorDetails}\n`);
  }
  return result.data;
}
