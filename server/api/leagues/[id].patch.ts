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

const patchLeague = leagueSchema.partial();

export default defineHandler(async (event) => {
  const db = useDatabase();
  const id = event.context.params?.id;
  const body = await readValidatedBody(event, patchLeague);
  const { name, season, rank } = body;

  if (name) {
    await db.sql`UPDATE leagues SET name = ${name} WHERE id = ${id}`;
  }

  if (season) {
    await db.sql`UPDATE leagues SET season = ${season} WHERE id = ${id}`;
  }

  if (rank) {
    await db.sql`UPDATE leagues SET rank = ${rank} WHERE id = ${id}`;
  }

  return { success: true };
});
