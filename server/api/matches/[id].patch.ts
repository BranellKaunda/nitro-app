import { useDrizzle } from "~/server/utils/drizzle";
import { defineHandler } from "nitro";
import { readValidatedBody } from "h3";
import { eq } from "drizzle-orm";
import { matches } from "~/server/database/schema";
import { matchSchema } from "~/server/utils/matchSchema";

const schema = matchSchema.partial();

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const body = await readValidatedBody(event, schema);
  const id = event.context.params?.id;

  await db
    .update(matches)
    .set({
      ...body,
      matchDate: body.matchDate?.toISOString(),
    })
    .where(eq(matches.id, Number(id)));

  return { success: true };
});
