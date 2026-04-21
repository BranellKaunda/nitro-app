import { defineRelations } from "drizzle-orm";
import * as schema from "~/server/database/schema.ts";

export const relations = defineRelations(schema, (r) => ({
  matches: {
    homeTeam: r.one.teams({
      from: r.matches.homeTeamId,
      to: r.teams.id,
    }),
    awayTeam: r.one.teams({
      from: r.matches.awayTeamId,
      to: r.teams.id,
    }),
    competition: r.one.leagues({
      from: r.matches.competitionId,
      to: r.leagues.id,
    }),
  },
}));

/* const relations = defineRelations({ users, posts }, (r) => ({
	posts: {
		author: r.one.users({
			from: r.posts.ownerId,
			to: r.users.id,
		}),
	}
})) */
