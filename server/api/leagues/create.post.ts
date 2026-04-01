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

export default defineHandler(async (event) => {
  const db = useDatabase();
  const body = await readValidatedBody(event, leagueSchema);
  const { name, season, rank } = body;

  await db.sql`INSERT INTO leagues (name, season, rank) VALUES (${name}, ${season}, ${rank})`;

  return { success: true };
});
