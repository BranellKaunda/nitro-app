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

const leagueSchema = z.object({
  name: firstLetterUpperCase,
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
