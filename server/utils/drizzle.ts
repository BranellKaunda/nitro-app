import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "~/server/database/schema.ts";
import { relations } from "~/server/database/relations";

let _db:
  | ReturnType<typeof drizzle<typeof schema, typeof relations>>
  | undefined;

export function useDrizzle() {
  if (!_db) {
    _db = drizzle(process.env.POSTGRES_URL!, { schema, relations });
  }
  return _db;
}
