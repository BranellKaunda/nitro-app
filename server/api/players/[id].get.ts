import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";
import { eq } from "drizzle-orm";
import { players } from "~/server/database/schema";

export default defineHandler(async (event) => {
  const id = event.context.params?.id;

  return await useDrizzle().query.players.findFirst({
    where: eq(players.id, Number(id)),
  });
});
