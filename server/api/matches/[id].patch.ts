import { useDatabase } from "nitro/database";
import { defineHandler } from "nitro";

export default defineHandler(async (event) => {
  const db = useDatabase();
  const body = await event.req.json();
  const id = event.context.params?.id;
  const {
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
    status,
    matchDate,
    competitionId,
  } = body;

  if (homeTeamId) {
    await db.sql`UPDATE matches SET home_team_id = ${homeTeamId} WHERE id = ${id}`;
  }

  if (awayTeamId) {
    await db.sql`UPDATE matches SET away_team_id = ${awayTeamId} WHERE id = ${id}`;
  }

  if (homeTeamGoals) {
    await db.sql`UPDATE matches SET home_team_goals = ${homeTeamGoals} WHERE id = ${id}`;
  }

  if (awayTeamGoals) {
    await db.sql`UPDATE matches SET away_team_goals = ${awayTeamGoals} WHERE id = ${id}`;
  }

  if (status) {
    await db.sql`UPDATE matches SET status = ${status} WHERE id = ${id}`;
  }

  if (matchDate) {
    await db.sql`UPDATE matches SET match_date = ${matchDate} WHERE id = ${id}`;
  }

  if (competitionId) {
    await db.sql`UPDATE matches SET competition_id = ${competitionId} WHERE id = ${id}`;
  }

  return { success: true };
});
