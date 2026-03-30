import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";

export default defineHandler(async (event) => {
  const db = useDatabase();
  const teamId = "7";
  const firstName = "lionel";
  const lastName = "messi";
  const dob = "2003-01-21";
  const position = "forward";
  const weightKg = 70;
  const heightCm = 180;

  await db.sql`INSERT INTO players (team_id, first_name, last_name, dob, position, weight_kg, height_cm) VALUES (${teamId}, ${firstName}, ${lastName}, ${dob}, ${position}, ${weightKg}, ${heightCm})`;
  return { api: "player added!" };
});
