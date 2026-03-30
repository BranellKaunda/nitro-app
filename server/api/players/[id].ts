import { defineHandler, HTTPError } from "nitro";
import { useDatabase } from "nitro/database";

export default defineHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw new HTTPError({
      statusCode: 400,
      statusMessage: "Missing player id",
    });
  }

  const db = useDatabase();
  const players = await db.sql`SELECT * FROM players WHERE team_id = ${id}`;
  return players;
});
