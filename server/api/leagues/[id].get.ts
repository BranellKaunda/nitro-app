import { useDrizzle } from "~/server/utils/drizzle";
import { defineHandler } from "nitro";

export default defineHandler(async (event) => {
  return await useDrizzle().query.leagues.findFirst({
    where: {
      id: Number(event.context.params!.id),
    },
  });
});
