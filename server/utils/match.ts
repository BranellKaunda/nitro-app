import { useDrizzle } from "~/server/utils/drizzle";
import { matches } from "~/server/database/schema";

export default async function createMatch(
  homeTeam: string,
  awayTeam: string,
  matchDate: string,
  homeTeamGoals: number,
  awayTeamGoals: number,
  competitionId: number,
) {
  const db = useDrizzle();

  //Finding home team
  const home = await db.query.teams.findFirst({
    where: (t, { eq }) => eq(t.name, homeTeam),
  });

  if (!home) {
    throw new Error(`Home team '${homeTeam}' does not exist`);
  }

  // 2. Finding away team
  const away = await db.query.teams.findFirst({
    where: (t, { eq }) => eq(t.name, awayTeam),
  });

  if (!away) {
    throw new Error(`Away team '${awayTeam}' does not exist`);
  }

  //if match already exists (same teams + same date)
  const existingMatch = await db.query.matches.findFirst({
    where: (m, { eq, and }) =>
      and(
        eq(m.homeTeamId, home.id),
        eq(m.awayTeamId, away.id),
        eq(m.matchDate, matchDate),
        eq(m.competitionId, competitionId),
      ),
  });

  if (existingMatch) {
    return { created: false, record: existingMatch };
  }

  //Inserting new match
  const [newMatch] = await db
    .insert(matches)
    .values({
      homeTeamId: home.id,
      awayTeamId: away.id,
      matchDate,
      homeTeamGoals,
      awayTeamGoals,
      competitionId,
    })
    .returning();

  return { created: true, record: newMatch };
}
