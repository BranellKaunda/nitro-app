import { useDatabase } from "nitro/database";
import { defineHandler } from "nitro";

export default defineHandler(async (event) => {
  const db = useDatabase();
  const id = event.context.params?.id;
  const league = await db.sql`SELECT * FROM leagues WHERE id = ${id}`;

  return league;
});
