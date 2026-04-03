import { useDrizzle } from "~/server/utils/drizzle";
import { defineHandler } from "nitro";

export default defineHandler(async () => {
  const matches = await useDrizzle().query.matches.findMany();

  return matches;
});
