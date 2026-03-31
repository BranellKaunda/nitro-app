import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";

export default defineHandler(async (event) => {
  const db = useDatabase();
  const id = event.context.params?.id;

  const match = await db.sql`SELECT * FROM matches WHERE id = ${id}`;
  return match;
});
