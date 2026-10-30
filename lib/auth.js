import { betterAuth } from "better-auth";
import Database from "better-sqlite3";

const database = new Database("bazardor-auth.db");

export const auth = betterAuth({
  database,

  emailAndPassword: {
    enabled: true,
  },

  trustedOrigins: ["http://localhost:3000"],
});