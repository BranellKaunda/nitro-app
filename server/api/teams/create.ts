import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";

export default defineHandler(async (event) => {
  const db = useDatabase();
  const club = "barcelona";
  const logo = "img12.png";
  const location = "barcelona";

  await db.sql`INSERT INTO teams (name, logo, location) VALUES (${club}, ${logo}, ${location})`;
  return { api: "it worked!" };
});
