import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";
import { readValidatedBody } from "h3";
import { matches } from "~/server/database/schema";
import { matchSchema } from "~/server/utils/matchSchema";

const schema = matchSchema;

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const body = await readValidatedBody(event, schema);

  await db.insert(matches).values({
    ...body,
    matchDate: body.matchDate.toISOString(),
  });

  return {
    success: true,
  };
});
