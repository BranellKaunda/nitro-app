import { defineHandler, HTTPError } from "nitro";
import { useDatabase } from "nitro/database";

export default defineHandler(async (event) => {
  const id = event.context.params?.id;

  if (!id) {
    throw new HTTPError({ statusCode: 400, statusMessage: "Missing team id" });
  }

  const db = useDatabase();
  const teams = await db.sql`SELECT * FROM teams WHERE id = ${id}`;
  return teams;
});
