import { defineHandler, HTTPError } from "nitro";
import { useDatabase } from "nitro/database";

export default defineHandler(async (event) => {
  const db = useDatabase();
  const id = event.context.params?.id;

  const players = await db.sql`SELECT * FROM players WHERE team_id = ${id}`;
  return players;
});
