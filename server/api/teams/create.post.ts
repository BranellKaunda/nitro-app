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

export default defineHandler(async (event) => {
  const db = useDatabase();
  //const body = await event.req.json();
  const body = await readValidatedBody(event, teamSchema);
  const { name, logo, location } = body;

  await db.sql`INSERT INTO teams (name, logo, location) VALUES (${name}, ${logo}, ${location})`;

  return { success: true };
});
