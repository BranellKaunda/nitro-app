import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineHandler(async (event) => {
  const players = await useDrizzle().query.players.findMany();
  return players;
});
