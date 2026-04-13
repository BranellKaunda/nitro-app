import { useDrizzle } from "~/server/utils/drizzle";
import { defineHandler } from "nitro";
import { eq } from "drizzle-orm";
import { teamStats } from "~/server/database/schema";

export default defineHandler(async (event) => {
  const id = event.context.params?.id;

  return await useDrizzle().query.teamStats.findFirst({
    where: eq(teamStats.teamId, Number(id)),
  });
});
