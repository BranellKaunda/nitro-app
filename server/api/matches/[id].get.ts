import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineHandler(async (event) => {
  return await useDrizzle().query.matches.findFirst({
    where: {
      id: Number(event.context.params!.id),
    },
  });
});
