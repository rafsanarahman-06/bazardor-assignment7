import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const auth = betterAuth({
  database: pool,

  emailAndPassword: {
    enabled: true,
  },

trustedOrigins: [
  "http://localhost:3000",
  "https://bazardor-assignment7.vercel.app",
  "https://bazardor-assignment7-2hbw8jn9h-rafsana.vercel.app",
],
});