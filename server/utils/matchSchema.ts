import * as z from "zod";

export const matchSchema = z.object({
  homeTeamId: z.number().int().positive(),
  awayTeamId: z.number().int().positive(),
  homeTeamGoals: z.number().int(),
  awayTeamGoals: z.number().int(),
  matchDate: z.coerce.date(),
  status: z.enum([
    "Scheduled",
    "Live",
    "Halftime",
    "finished",
    "Postponed",
    "Cancelled",
    "Abandoned",
  ]),
  competitionId: z.number().int().positive(),
});
