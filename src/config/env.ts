import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(8080),
  HOST: z.string().default('0.0.0.0'),
  TENANT_DATA_DIR: z.string().default('./data/tenants'),
  MCP_REGISTRY_PATH: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export const loadEnv = (overrides: NodeJS.ProcessEnv = process.env): Env => {
  const parsed = envSchema.safeParse(overrides);
  if (!parsed.success) {
    throw new Error(
      `Invalid environment configuration: ${parsed.error.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join(', ')}`,
    );
  }

  return parsed.data;
};
