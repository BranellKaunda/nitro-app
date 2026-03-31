import { defineHandler } from "nitro";
import { useDatabase } from "nitro/database";

export default defineHandler(async (event) => {
  const db = useDatabase();

  // We get the data from the request
  const body = await event.req.json();

  const { club, logo, location } = body
  // same as 
  // const club = body.club
  // const logo = body.logo
  // const location = body.location

  await db.sql`INSERT INTO teams (name, logo, location) VALUES (${club}, ${logo}, ${location})`;
  
  return { success: true };
});
