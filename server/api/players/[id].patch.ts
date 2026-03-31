import { useDatabase } from "nitro/database";
import { defineHandler } from "nitro";

export default defineHandler(async (event) => {
  const db = useDatabase();
  const body = await event.req.json();
  const id = event.context.params?.id;
  const { firstName, lastName, dob, position, weightKg, heightCm } = body;

  if (firstName) {
    await db.sql`UPDATE players SET first_name = ${firstName} WHERE id = ${id}`;
  }

  if (lastName) {
    await db.sql`UPDATE players SET last_name = ${lastName} WHERE id = ${id}`;
  }

  if (dob) {
    await db.sql`UPDATE players SET dob = ${dob} WHERE id = ${id}`;
  }

  if (position) {
    await db.sql`UPDATE players SET position = ${position} WHERE id = ${id}`;
  }

  if (weightKg) {
    await db.sql`UPDATE players SET weight_kg = ${weightKg} WHERE id = ${id}`;
  }

  if (heightCm) {
    await db.sql`UPDATE players SET height_cm = ${heightCm} WHERE id = ${id}`;
  }

  return { success: true };
});
