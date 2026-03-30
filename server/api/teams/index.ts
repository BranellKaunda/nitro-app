import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";

export default defineHandler(async (event) => {
  const db = useDatabase();
  const teams = await db.sql`SELECT * FROM teams`;
  return teams;
});
