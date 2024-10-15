import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "./schema";
import { nanoid } from "nanoid";
import { Pool } from "pg";

export const connection = async () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
  });
  const db = drizzle(pool);

  const user: typeof usersTable.$inferInsert = {
    id: nanoid(),
    name: "Will",
    email: "john@example.com",
  };
  await db.insert(usersTable).values(user).onConflictDoNothing();
  return db;
};
