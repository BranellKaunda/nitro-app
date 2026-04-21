import { defineHandler } from "nitro";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import createTeam from "~/server/utils/team";

type MatchRecord = {
  date: string;
  home_team: string;
  away_team: string;
  home_goals: number;
  away_goals: number;
};

export default defineHandler(async (event) => {
  // 1. file path
  const filePath = path.join(process.cwd(), "data", `2022season.csv`);

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
    const home = match.home_team;
    const away = match.away_team;

    const homeTeam = await createTeam(home);
    const awayTeam = await createTeam(away);

    if (homeTeam.created) {
      inserted++;
    } else skipped++;

    if (awayTeam.created) {
      inserted++;
    } else skipped++;
  }

  return {
    inserted,
    skipped,
  };
});
