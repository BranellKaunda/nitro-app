import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineHandler(async (event) => {
  const teams = await useDrizzle().query.teams.findMany()
  return teams;
});
