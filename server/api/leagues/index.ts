import { useDrizzle } from "~/server/utils/drizzle";
import { defineHandler } from "nitro";

export default defineHandler(async () => {
  const leagues = await useDrizzle().query.leagues.findMany();
  return leagues;
});
