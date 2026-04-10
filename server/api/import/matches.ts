import { defineHandler } from "nitro";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import createMatch from "~/server/utils/match";

type MatchRecord = {
  date: string;
  home_team: string;
  away_team: string;
  home_goals: number;
  away_goals: number;
};

export default defineHandler(async (event) => {
  // 1. file path
  const filePath = path.join(process.cwd(), "data", `2025season.csv`);

  // 2. Read file as text
  const fileContent = fs.readFileSync(filePath, "utf8");

  // 3. change to object
  const records: MatchRecord[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  let inserted = 0;
  let skipped = 0;

  for (const match of records) {
    const result = await createMatch(
      match.home_team,
      match.away_team,
      match.date,
      match.home_goals,
      match.away_goals,
    );

    if (result.created) {
      inserted++;
    } else {
      skipped++;
    }
  }

  return {
    inserted,
    skipped,
  };
});
