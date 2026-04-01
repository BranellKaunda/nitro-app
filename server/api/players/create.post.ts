import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";
import { readValidatedBody } from "h3";
import * as z from "zod";
import { capitalize } from "es-toolkit/string";

const playerSchema = z.object({
  teamId: z.int().positive(),
  firstName: z.string().min(2).transform(capitalize),
  lastName: z.string().min(2).transform(capitalize),
  dob: z.coerce.date(),
  position: z.string().min(7).transform(capitalize),
  weightKg: z.number().int().positive(),
  heightCm: z.number().int().positive(),
});

export default defineHandler(async (event) => {
  const db = useDatabase();
  const body = await readValidatedBody(event, playerSchema);
  const { teamId, firstName, lastName, dob, position, weightKg, heightCm } =
    body;

  await db.sql`INSERT INTO players (team_id, first_name, last_name, dob, position, weight_kg, height_cm) VALUES (${teamId}, ${firstName}, ${lastName}, ${dob.toISOString()}, ${position}, ${weightKg}, ${heightCm})`;

  return { success: true };
});
