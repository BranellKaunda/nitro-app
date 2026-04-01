import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";
import { readValidatedBody } from "h3";
import * as z from "zod";
import { capitalize } from "es-toolkit";

const matcheschema = z.object({
  homeTeamId: z.number().int().positive(),
  awayTeamId: z.number().int().positive(),
  homeTeamGoals: z.number().int(),
  awayTeamGoals: z.number().int(),
  matchDate: z.coerce.date(),
  status: z.string().min(2).transform(capitalize),
  competitionId: z.number().int().positive(),
});

export default defineHandler(async (event) => {
  const db = useDatabase();
  const body = await readValidatedBody(event, matcheschema);
  const {
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
    status,
    matchDate,
    competitionId,
  } = body;

  await db.sql`INSERT INTO matches (home_team_id, away_team_id, home_team_goals, away_team_goals, status, match_date, competition_id) VALUES (${homeTeamId}, ${awayTeamId}, ${homeTeamGoals}, ${awayTeamGoals}, ${status}, ${matchDate.toISOString()}, ${competitionId})`;

  return {
    success: true,
  };
});
