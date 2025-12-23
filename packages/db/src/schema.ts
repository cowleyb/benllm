import { pgTable, uuid, varchar, text, timestamp, foreignKey, unique, boolean } from 'drizzle-orm/pg-core';

export const post = pgTable('post', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  title: varchar({ length: 256 }).notNull(),
  content: text().notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' }),
});

export * from './auth-schema.js';
