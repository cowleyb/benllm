

import { defineConfig } from 'drizzle-kit';



if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATBASE URL")
}

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});