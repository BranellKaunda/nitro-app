import { defineHandler } from "nitro";
import getStats from "~/server/utils/stats";

export default defineHandler(async (event) => {
  const id = Number(event.context.params?.id);

  if (!id || isNaN(id)) {
    return { status: "error", message: "Invalid competition ID" };
  }

  return await getStats(id);
});
