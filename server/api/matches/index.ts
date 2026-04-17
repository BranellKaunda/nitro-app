import { useDrizzle } from "~/server/utils/drizzle";
import { defineHandler } from "nitro";
import { getQuery } from "h3";
import { sql } from "drizzle-orm";

export default defineHandler(async (event) => {
  const query = getQuery(event);
  const teams = await useDrizzle().query.teams.findMany();
  const leagues = await useDrizzle().query.leagues.findMany();

  const matches = await useDrizzle().query.matches.findMany({
    where: (m, { or, ilike, eq, gte, lte }) => {
      const totalGoals = sql`${m.homeTeamGoals} + ${m.awayTeamGoals}`;

      return or(
        query.teamId
          ? or(
              eq(m.homeTeamId, Number(query.teamId)),
              eq(m.awayTeamId, Number(query.teamId)),
            )
          : undefined,
        query.homeTeamGoals
          ? eq(m.homeTeamGoals, Number(query.homeTeamGoals))
          : undefined,
        query.awayTeamGoals
          ? eq(m.awayTeamGoals, Number(query.awayTeamGoals))
          : undefined,
        query.minGoals ? gte(totalGoals, Number(query.minGoals)) : undefined,

        query.maxGoals ? lte(totalGoals, Number(query.maxGoals)) : undefined,
        query.month
          ? eq(sql`EXTRACT(MONTH FROM ${m.matchDate})`, Number(query.month))
          : undefined,
        query.year
          ? eq(sql`EXTRACT(YEAR FROM ${m.matchDate})`, Number(query.year))
          : undefined,
        query.date ? eq(m.matchDate, query.date) : undefined,

        //m.status is type enum
        query.status
          ? ilike(sql`${m.status}::text`, `%${query.status}%`)
          : undefined,
        query.competitionId
          ? eq(m.competitionId, Number(query.competitionId))
          : undefined,
      );
    },
  });

  const teamMap = Object.fromEntries(teams.map((t) => [t.id, t]));
  const leagueMap = Object.fromEntries(leagues.map((l) => [l.id, l]));

  const formattedMatches = matches.map((match) => {
    const home = teamMap[match.homeTeamId];
    const away = teamMap[match.awayTeamId];
    const league = leagueMap[match.competitionId];

    return {
      //...match,
      id: match?.id,
      date: match?.matchDate,
      competition: {
        id: league?.id,
        name: league?.name,
        season: league?.season,
      },
      homeTeam: {
        id: home?.id,
        name: home?.name,
        logo: home?.logo,
        goals: match?.homeTeamGoals,
      },
      awayTeam: {
        id: away?.id,
        name: away?.name,
        logo: away?.logo,
        goals: match?.awayTeamGoals,
      },
    };
  });

  return formattedMatches;
});
