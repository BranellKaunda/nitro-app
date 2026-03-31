import { useDatabase } from "nitro/database";
import { defineHandler } from "nitro";

export default defineHandler(async () => {
  const db = useDatabase();
  const matches = await db.sql`SELECT * FROM matches`;

  /* const matches =
    await db.sql`SELECT matches.id, ht.name as home, at.name as away, home_team_goals, away_team_goals, leagues.name as competition, match_date, matches.status FROM matches JOIN teams AS ht ON matches.home_team_id = ht.id JOIN teams AS "at" ON matches.away_team_id = at.id JOIN leagues ON matches.competition_id = leagues.id`; */

  return matches;
});
