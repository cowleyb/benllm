import type { Config } from 'drizzle-kit';

const SCHEMA = 'benllm';

if (!process.env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL');
}

const nonPoolingUrl = process.env.DATABASE_URL.replace(':6543', ':5432');

export default {
  schema: './src/schema.ts',
  dialect: 'postgresql',
  dbCredentials: { url: nonPoolingUrl },
  casing: 'snake_case',
  tablesFilter: ['*'],
  schemaFilter: ['public', SCHEMA],
} satisfies Config;
