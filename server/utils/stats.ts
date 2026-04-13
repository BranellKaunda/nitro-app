import { useDrizzle } from "~/server/utils/drizzle";
import { teamStats } from "~/server/database/schema";

type TeamStats = {
  team_id: number;
  competitionId: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  points: number;
};

export default async function getStats(competitionId: number = 1) {
  const db = useDrizzle();
  const matches = await db.query.matches.findMany({
    where: (m, { eq }) => eq(m.competitionId, competitionId),
  });

  const standings: Record<number, TeamStats> = {};

  for (const match of matches) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;

    // skip if any required field is null
    if (
      homeTeamId == null ||
      awayTeamId == null ||
      homeTeamGoals == null ||
      awayTeamGoals == null
    ) {
      continue;
    }

    // initialize teams
    if (!standings[homeTeamId]) standings[homeTeamId] = initTeam(homeTeamId);
    if (!standings[awayTeamId]) standings[awayTeamId] = initTeam(awayTeamId);

    // update goals
    standings[homeTeamId].goals_for += homeTeamGoals;
    standings[homeTeamId].goals_against += awayTeamGoals;

    standings[awayTeamId].goals_for += awayTeamGoals;
    standings[awayTeamId].goals_against += homeTeamGoals;

    //update competitionId
    standings[homeTeamId].competitionId = competitionId;
    standings[awayTeamId].competitionId = competitionId;

    // update played
    standings[homeTeamId].played++;
    standings[awayTeamId].played++;

    // points logic
    if (homeTeamGoals > awayTeamGoals) {
      standings[homeTeamId].wins++;
      standings[homeTeamId].points += 3;
      standings[awayTeamId].losses++;
    } else if (homeTeamGoals < awayTeamGoals) {
      standings[awayTeamId].wins++;
      standings[awayTeamId].points += 3;
      standings[homeTeamId].losses++;
    } else {
      standings[homeTeamId].draws++;
      standings[awayTeamId].draws++;
      standings[homeTeamId].points += 1;
      standings[awayTeamId].points += 1;
    }
  }

  // converting object to array
  const stats = Object.values(standings);

  // 3. Insert into DB if not exists
  let inserted = 0;
  let skipped = 0;

  for (const s of stats) {
    const existing = await db.query.teamStats.findFirst({
      where: (t, { eq, and }) =>
        and(eq(t.teamId, s.team_id), eq(t.competitionId, competitionId)),
    });

    if (existing) {
      skipped++;
      continue;
    }

    await db.insert(teamStats).values({
      teamId: s.team_id,
      competitionId: s.competitionId,
      played: s.played,
      wins: s.wins,
      draws: s.draws,
      losses: s.losses,
      goalsFor: s.goals_for,
      goalsAgainst: s.goals_against,
      points: s.points,
    });

    inserted++;
  }

  return {
    status: "ok",
    inserted,
    skipped,
    stats,
  };

  //return { status: "ok", stats };
}

export function initTeam(team_id: number) {
  return {
    team_id,
    competitionId: 1,
    played: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goals_for: 0,
    goals_against: 0,
    points: 0,
  };
}
