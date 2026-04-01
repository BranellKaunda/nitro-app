import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const teams = pgTable("teams", {
  id: serial().primaryKey(),
  name: text().notNull(),
  logo: text().notNull(),
  location: text().notNull(),
});
