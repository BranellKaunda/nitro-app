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

const teamSchema = z.object({
  name: firstLetterUpperCase,
  logo: z.string(),
  location: firstLetterUpperCase,
});

const patchTeamSchema = teamSchema.partial();

export default defineHandler(async (event) => {
  const db = useDatabase();
  const body = await readValidatedBody(event, patchTeamSchema);
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
