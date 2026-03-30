/* import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";

export default defineHandler(async (event) => {
  const body = await event.req.json();

  const db = useDatabase();
  const teams = await db.sql`ALTER TABLE teams SET`;
  return teams;
}); */
