import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";
import { readValidatedBody } from "h3";
import * as z from "zod";

const firstLetterUpperCase = z
  .string()
  .min(2)
  .transform((val) =>
    val
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
  );

const playerSchema = z.object({
  teamId: z.int().positive(),
  firstName: firstLetterUpperCase,
  lastName: firstLetterUpperCase,
  dob: z.coerce.date(),
  position: firstLetterUpperCase,
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
