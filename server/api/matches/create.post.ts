import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";

export default defineHandler(async (event) => {
  const db = useDatabase();
  const body = await event.req.json();
  const { homeTeamId, awayTeamId, matchDate, competitionId } = body;

  await db.sql`INSERT INTO matches (home_team_id, away_team_id, match_date, competition_id) VALUES (${homeTeamId}, ${awayTeamId}, ${matchDate}, ${competitionId})`;
  return {
    success: true,
  };
});
