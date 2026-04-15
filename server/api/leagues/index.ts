import { useDrizzle } from "~/server/utils/drizzle";
import { defineHandler } from "nitro";
import { getQuery } from "h3";

export default defineHandler(async (event) => {
  const query = getQuery(event);
  const leagues = await useDrizzle().query.leagues.findMany({
    where: (league, { ilike, eq, or }) => {
      return or(
        query.name ? ilike(league.name, `%${query.name}%`) : undefined,
        query.season ? eq(league.season, query.season) : undefined,
        query.rank ? eq(league.rank, Number(query.rank)) : undefined,
      );
    },
  });

  return leagues;
});
