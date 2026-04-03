import { defineHandler } from "nitro";
import { readValidatedBody } from "h3";
import { useDrizzle } from "~/server/utils/drizzle";
import { players } from "~/server/database/schema";
import { playerSchema } from "~/server/utils/playerSchema";

const schema = playerSchema;

export default defineHandler(async (event) => {
  const db = useDrizzle();
  const body = await readValidatedBody(event, schema);

  await db.insert(players).values({ ...body, dob: body.dob.toISOString() });

  return { success: true };
});
