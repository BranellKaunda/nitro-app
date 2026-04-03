import { defineHandler } from "nitro";
import { matches } from "~/server/database/schema";
import { useDrizzle } from "~/server/utils/drizzle";
import { eq } from "drizzle-orm";

export default defineHandler(async (event) => {
  const id = event.context.params?.id;

  return await useDrizzle().query.matches.findFirst({
    where: eq(matches.id, Number(id)),
  });
});
