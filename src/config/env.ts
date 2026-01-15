import { z } from 'zod';
import 'dotenv/config';
const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  APP_NAME: z.string().min(1).default('pulseboard-api'),
  DATABASE_URL: z.string().min(1),
});

export type AppEnv = z.infer<typeof EnvSchema>;

export const env: AppEnv = (() => {
  const parsed = EnvSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    for (const issue of parsed.error.issues) {
      console.error(`- ${issue.path.join('.') || '(root)'}: ${issue.message}`);
    }
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
})();
