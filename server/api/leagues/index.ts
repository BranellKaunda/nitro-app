import { useDatabase } from "nitro/database";
import { defineHandler } from "nitro";

export default defineHandler(async () => {
  const db = useDatabase();
  const leagues = await db.sql`SELECT * FROM leagues`;

  return leagues;
});
