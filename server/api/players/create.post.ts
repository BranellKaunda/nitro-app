import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";

export default defineHandler(async (event) => {
  const db = useDatabase();
  const body = await event.req.json();
  const { teamId, firstName, lastName, dob, position, weightKg, heightCm } =
    body;

  await db.sql`INSERT INTO players (team_id, first_name, last_name, dob, position, weight_kg, height_cm) VALUES (${teamId}, ${firstName}, ${lastName}, ${dob}, ${position}, ${weightKg}, ${heightCm})`;

  return { success: true };
});
