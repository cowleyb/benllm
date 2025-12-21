import { createPool, sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

import * as schema from './schema';
import { env } from '@repo/env';

export const db = drizzle({
  client: createPool({
    connectionString: env.DATABASE_URL,
  }),
  schema,
});
