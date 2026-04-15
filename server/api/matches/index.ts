import { useDrizzle } from "~/server/utils/drizzle";
import { defineHandler } from "nitro";
import { getQuery } from "h3";
import { sql } from "drizzle-orm";

export default defineHandler(async (event) => {
  const query = getQuery(event);

  const matches = await useDrizzle().query.matches.findMany({
    where: (m, { or, ilike, eq, gte, lte }) => {
      const totalGoals = sql`${m.homeTeamGoals} + ${m.awayTeamGoals}`;

      return or(
        query.homeTeamId
          ? eq(m.homeTeamId, Number(query.homeTeamId))
          : undefined,
        query.awayTeamId
          ? eq(m.awayTeamId, Number(query.awayTeamId))
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

  return matches;
});
