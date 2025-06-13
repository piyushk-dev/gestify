// lib/db.ts
import { Client } from "pg";

export const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

(async () => {
  try {
    await db.connect();
    console.log("✅ Connected to Supabase DB");
  } catch (err) {
    console.error("❌ Database connection error", err);
  }
})();
