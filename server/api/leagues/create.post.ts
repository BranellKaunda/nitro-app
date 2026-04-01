import { useDatabase } from "nitro/database";
import { defineHandler } from "nitro";
import { readValidatedBody } from "h3";
import * as z from "zod";
import { capitalize } from "es-toolkit";

const leagueSchema = z.object({
  name: z.string().min(3).max(50).transform(capitalize),
  season: z.string().min(7).max(9),
  rank: z.number().positive(),
});

export default defineHandler(async (event) => {
  const db = useDatabase();
  const body = await readValidatedBody(event, leagueSchema);
  const { name, season, rank } = body;

  await db.sql`INSERT INTO leagues (name, season, rank) VALUES (${name}, ${season}, ${rank})`;

  return { success: true };
});
