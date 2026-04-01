import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "~/server/database/schema.ts";

export function useDrizzle() {
  return drizzle(process.env.POSTGRES_URL!, { schema });
}
