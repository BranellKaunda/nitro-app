import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";

export default defineHandler(async (event) => {
  const db = useDatabase();
  const players = await db.sql`SELECT * FROM players`;
  return players;
});
