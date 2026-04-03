import { useDrizzle } from "~/server/utils/drizzle";
import { defineHandler } from "nitro";
import { eq } from "drizzle-orm";
import { leagues } from "~/server/database/schema";

export default defineHandler(async (event) => {
  const id = event.context.params?.id;

  return await useDrizzle().query.leagues.findFirst({
    where: eq(leagues.id, Number(id)),
  });
});
