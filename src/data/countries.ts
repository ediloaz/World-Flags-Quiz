export type CountryTier = "Iconicas" | "Mezcladas";

export type Country = {
  name: string;
  code: string;
  continent: string;
  tier: CountryTier;
  keywords: string[];
};

export const countries: Country[] = [
  {
    name: "Argentina",
    code: "AR",
    continent: "América del Sur",
    tier: "Iconicas",
    keywords: ["mate", "albiceleste", "mar del plata"]
  },
  {
    name: "Brasil",
    code: "BR",
    continent: "América del Sur",
    tier: "Iconicas",
    keywords: ["selesao", "amazonia", "rio"]
  },
  {
    name: "Estados Unidos",
    code: "US",
    continent: "América del Norte",
    tier: "Iconicas",
    keywords: ["stars", "stripes", "liberty"]
  },
  {
    name: "España",
    code: "ES",
    continent: "Europa",
    tier: "Iconicas",
    keywords: ["iberia", "sol", "paella"]
  },
  {
    name: "México",
    code: "MX",
    continent: "América del Norte",
    tier: "Iconicas",
    keywords: ["águila", "azteca", "verde"]
  },
  {
    name: "Japón",
    code: "JP",
    continent: "Asia",
    tier: "Iconicas",
    keywords: ["sol naciente", "honshu"]
  },
  {
    name: "Italia",
    code: "IT",
    continent: "Europa",
    tier: "Iconicas",
    keywords: ["tricolore", "roma", "pizza"]
  },
  {
    name: "Canadá",
    code: "CA",
    continent: "América del Norte",
    tier: "Iconicas",
    keywords: ["maple", "otoño"]
  },
  {
    name: "Reino Unido",
    code: "GB",
    continent: "Europa",
    tier: "Iconicas",
    keywords: ["union jack", "londres"]
  },
  {
    name: "Alemania",
    code: "DE",
    continent: "Europa",
    tier: "Iconicas",
    keywords: ["bundes", "berlin"]
  },
  {
    name: "Islandia",
    code: "IS",
    continent: "Europa",
    tier: "Mezcladas",
    keywords: ["geisers", "vikingos"]
  },
  {
    name: "Botsuana",
    code: "BW",
    continent: "África",
    tier: "Mezcladas",
    keywords: ["okavango", "diamantes"]
  },
  {
    name: "Kiribati",
    code: "KI",
    continent: "Oceanía",
    tier: "Mezcladas",
    keywords: ["pacifico", "islas"]
  },
  {
    name: "Bután",
    code: "BT",
    continent: "Asia",
    tier: "Mezcladas",
    keywords: ["drak", "felicidad"]
  },
  {
    name: "Mongolia",
    code: "MN",
    continent: "Asia",
    tier: "Mezcladas",
    keywords: ["estepar", "gengis"]
  },
  {
    name: "Mozambique",
    code: "MZ",
    continent: "África",
    tier: "Mezcladas",
    keywords: ["ak47", "indico"]
  },
  {
    name: "Fiyi",
    code: "FJ",
    continent: "Oceanía",
    tier: "Mezcladas",
    keywords: ["turquesa", "pacifico"]
  },
  {
    name: "Namibia",
    code: "NA",
    continent: "África",
    tier: "Mezcladas",
    keywords: ["dunas", "safari"]
  },
  {
    name: "Uzbekistán",
    code: "UZ",
    continent: "Asia",
    tier: "Mezcladas",
    keywords: ["tashkent", "soya"]
  },
  {
    name: "Sri Lanka",
    code: "LK",
    continent: "Asia",
    tier: "Mezcladas",
    keywords: ["ceilan", "león"]
  },
  {
    name: "Eslovenia",
    code: "SI",
    continent: "Europa",
    tier: "Mezcladas",
    keywords: ["julianas", "alpino"]
  },
  {
    name: "Perú",
    code: "PE",
    continent: "América del Sur",
    tier: "Mezcladas",
    keywords: ["ande", "inca"]
  },
  {
    name: "Costa Rica",
    code: "CR",
    continent: "América Central",
    tier: "Mezcladas",
    keywords: ["pura vida", "selva"]
  },
  {
    name: "Nueva Zelanda",
    code: "NZ",
    continent: "Oceanía",
    tier: "Mezcladas",
    keywords: ["kiwi", "tasman"]
  }
];

export const tierDescriptions: Record<CountryTier, string> = {
  Iconicas: "Banderas más reconocibles y virales.",
  Mezcladas: "Iconicas combinadas con joyas menos vistas para un reto extremo."
};
