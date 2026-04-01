import { useDatabase } from "nitro/database";
import { defineHandler } from "nitro";
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
  weightKg: z.int().positive(),
  heightCm: z.int().positive(),
});

const patchPlayerSchema = playerSchema.partial();

export default defineHandler(async (event) => {
  const db = useDatabase();
  const body = await readValidatedBody(event, patchPlayerSchema);
  const id = event.context.params?.id;
  const { firstName, lastName, dob, position, weightKg, heightCm } = body;

  if (firstName) {
    await db.sql`UPDATE players SET first_name = ${firstName} WHERE id = ${id}`;
  }

  if (lastName) {
    await db.sql`UPDATE players SET last_name = ${lastName} WHERE id = ${id}`;
  }

  if (dob) {
    await db.sql`UPDATE players SET dob = ${dob.toISOString()} WHERE id = ${id}`;
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
