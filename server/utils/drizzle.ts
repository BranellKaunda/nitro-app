import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "~/server/database/schema.ts";

let _db: ReturnType<typeof drizzle<typeof schema>> | undefined;

export function useDrizzle() {
  if (!_db) {
    _db = drizzle(process.env.POSTGRES_URL!, { schema });
  }
  return _db;
}
