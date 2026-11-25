import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .default('4000')
    .transform((val) => parseInt(val, 10))
    .refine((port) => !isNaN(port) && port > 0 && port < 65536, {
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
    .refine((origins) => origins.length > 0, {
      message: 'CORS_ORIGINS must contain at least one valid origin',
    }),
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
