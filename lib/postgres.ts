// lib/postgres.ts
import postgres from 'postgres';

const globalForSql = globalThis as unknown as {
  sql: ReturnType<typeof postgres> | undefined;
};

export const sql =
  globalForSql.sql ??
  postgres(process.env.DATABASE_URL!, {
    ssl: 'require', // Important for Supabase/production
  });

if (process.env.NODE_ENV !== 'production') globalForSql.sql = sql;
