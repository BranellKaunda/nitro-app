import { defineHandler } from "nitro";
import { teams } from "~/server/database/schema";
import { useDrizzle } from "~/server/utils/drizzle";
import { eq } from "drizzle-orm";

export default defineHandler(async (event) => {
  const id = event.context.params?.id;

  return await useDrizzle().query.teams.findFirst({
    where: eq(teams.id, Number(id)),
  });
});
