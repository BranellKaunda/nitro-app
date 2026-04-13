import { defineHandler } from "nitro";
import getStats from "~/server/utils/stats";

export default defineHandler(async (event) => {
  return (await getStats()).stats;
});
