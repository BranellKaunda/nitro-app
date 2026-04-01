import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";
import { readValidatedBody } from "h3";
import * as z from "zod";
import { capitalize } from "es-toolkit/string";

const teamSchema = z.object({
  name: z.string().min(2).transform(capitalize),
  logo: z.string(),
  location: z.string().min(2).transform(capitalize),
});

export default defineHandler(async (event) => {
  const db = useDatabase();
  const body = await readValidatedBody(event, teamSchema);
  const { name, logo, location } = body;

  await db.sql`INSERT INTO teams (name, logo, location) VALUES (${name}, ${logo}, ${location})`;

  return { success: true };
});
