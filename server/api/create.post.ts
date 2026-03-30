import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";

export default defineHandler(async (event) => {
  const db = useDatabase();

  const club = "Barcelona";
  const logo = "img11.png";
  const location = "Madrid";

  await db.sql`INSERT INTO teams (name, logo, location) VALUES (${club}, ${logo}, ${location})`;
  return { api: "works init!" };
});
