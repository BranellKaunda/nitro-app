import { useDatabase } from "nitro/database";
import { defineHandler } from "nitro";

export default defineHandler(async (event) => {
  const db = useDatabase();
  const id = event.context.params?.id;
  const body = await event.req.json();
  const { name, season, rank } = body;

  if (name) {
    await db.sql`UPDATE leagues SET name = ${name} WHERE id = ${id}`;
  }

  if (season) {
    await db.sql`UPDATE leagues SET season = ${season} WHERE id = ${id}`;
  }

  if (rank) {
    await db.sql`UPDATE leagues SET rank = ${rank} WHERE id = ${id}`;
  }

  return { success: true };
});
