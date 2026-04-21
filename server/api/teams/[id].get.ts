import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineHandler(async (event) => {
  return await useDrizzle().query.teams.findFirst({
    where: {
      id: Number(event.context.params!.id),
    },
  });
});
