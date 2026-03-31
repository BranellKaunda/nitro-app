import { useDatabase } from "nitro/database";
import { defineHandler } from "nitro";

export default defineHandler(async (event) => {
  const db = useDatabase();
  const body = await event.req.json();
  const { name, season, rank } = body;

  await db.sql`INSERT INTO leagues (name, season, rank) VALUES (${name}, ${season}, ${rank})`;

  return { success: true };
});
