import { getQuery } from "h3";
import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineHandler(async (event) => {
  const query = getQuery(event);

  const teams = await useDrizzle().query.teams.findMany({
    where: (teams, { ilike, or }) =>
      or(
        query.name ? ilike(teams.name, `%${query.name}%`) : undefined,
        query.location
          ? ilike(teams.location, `%${query.location}%`)
          : undefined,
      ),
  });

  return teams;
});
