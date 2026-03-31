import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";

export default defineHandler(async (event) => {
  const db = useDatabase();
  const body = await event.req.json();
  const id = event.context.params?.id;
  const { name, logo, location } = body;

  if (name) {
    await db.sql`UPDATE teams SET name = ${name} WHERE id = ${id}`;
  }

  if (logo) {
    await db.sql`UPDATE teams SET logo = ${logo} WHERE id = ${id}`;
  }

  if (location) {
    await db.sql`UPDATE teams SET location = ${location} WHERE id = ${id}`;
  }

  return { success: true };
});
