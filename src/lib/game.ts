import { countries, type Country, type CountryTier } from "@/data/countries";

export type DifficultyConfig = {
  tier: CountryTier;
  label: string;
  description: string;
  detailed: boolean;
  leaderboardWeight: number;
};

export const difficulties: Record<string, DifficultyConfig> = {
  iconicas: {
    tier: "Iconicas",
    label: "Icono Pop",
    description: "Warm-up vibrante con banderas virales.",
    detailed: false,
    leaderboardWeight: 1
  },
  mezcladas: {
    tier: "Mezcladas",
    label: "Legend Mix",
    description: "Modo oficial con banderas conocidas y rarezas.",
    detailed: true,
    leaderboardWeight: 2
  }
};

export type QuizRound = {
  flag: Country;
  options: Country[];
};

export const MAX_OPTIONS = 4;

export function pickCountries(tier: CountryTier, limit: number): Country[] {
  const pool = countries.filter((country) => country.tier === tier);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(limit, shuffled.length));
}

export function buildRounds(tier: CountryTier, limit: number): QuizRound[] {
  const chosen = pickCountries(tier, limit);
  return chosen.map((country) => {
    const distractors = countries
      .filter((c) => c.code !== country.code)
      .sort(() => Math.random() - 0.5)
      .slice(0, MAX_OPTIONS - 1);

    const options = [...distractors, country].sort(() => Math.random() - 0.5);

    return {
      flag: country,
      options
    };
  });
}
