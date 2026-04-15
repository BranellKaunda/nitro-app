import { getQuery } from "h3";
import { defineHandler } from "nitro";
//import { teamStats } from "~/server/database/schema";
import { useDrizzle } from "~/server/utils/drizzle";
//import getStats from "~/server/utils/stats";

export default defineHandler(async (event) => {
  const query = getQuery(event);

  const stats = await useDrizzle().query.teamStats.findMany({
    where: (teamStats, { or, eq, gte, lte }) =>
      or(
        query.teamId ? eq(teamStats.teamId, Number(query.teamId)) : undefined,
        query.competitionId
          ? eq(teamStats.competitionId, Number(query.competitionId))
          : undefined,
        query.minWins ? gte(teamStats.wins, Number(query.minWins)) : undefined,
        query.maxWins ? lte(teamStats.wins, Number(query.maxWins)) : undefined,
        query.minDraws
          ? gte(teamStats.draws, Number(query.minDraws))
          : undefined,
        query.maxDraws
          ? lte(teamStats.draws, Number(query.maxDraws))
          : undefined,
        query.minLosses
          ? gte(teamStats.losses, Number(query.minLosses))
          : undefined,
        query.maxLosses
          ? lte(teamStats.losses, Number(query.maxLosses))
          : undefined,
        query.minGoalsFor
          ? gte(teamStats.goalsFor, Number(query.minGoalsFor))
          : undefined,
        query.maxGoalsFor
          ? lte(teamStats.goalsFor, Number(query.maxGoalsFor))
          : undefined,
        query.minGoalsAgainst
          ? gte(teamStats.goalsAgainst, Number(query.minGoalsAgainst))
          : undefined,
        query.maxGoalsAgainst
          ? lte(teamStats.goalsAgainst, Number(query.maxGoalsAgainst))
          : undefined,
        query.minPoints
          ? gte(teamStats.points, Number(query.minPoints))
          : undefined,
        query.maxPoints
          ? lte(teamStats.points, Number(query.maxPoints))
          : undefined,
      ),
  });

  return stats;
});
