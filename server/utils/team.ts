import { useDrizzle } from "~/server/utils/drizzle";
import { teams } from "~/server/database/schema";

export default async function createTeam(name: string) {
  const db = useDrizzle();

  let created = false;
  let team = await db.query.teams.findFirst({
    where: { name: name },
  });

  if (!team) {
    [team] = await db
      .insert(teams)
      .values({ name: name, logo: "img.png", location: "malawi" })
      .returning();
    created = true;
  }

  return { record: team, created };
}
