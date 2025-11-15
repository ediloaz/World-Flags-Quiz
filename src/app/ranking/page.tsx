import type { Metadata } from "next";
import RankingClient from "./RankingClient";

const siteUrl = "https://world-flags-quiz.ediloaz.com";

export const metadata: Metadata = {
  title: "Ranking Global - World Flags Quiz",
  description: "Consulta el ranking global de World Flags Quiz. Descubre quiénes son los mejores jugadores en este Global Flag Quiz Game. Compite y escala posiciones.",
  keywords: [
    "ranking world flags quiz",
    "ranking global banderas",
    "mejores jugadores",
    "leaderboard",
    "ranking geografía",
    "top players flag quiz",
  ],
  openGraph: {
    title: "Ranking Global - World Flags Quiz",
    description: "Consulta el ranking global de World Flags Quiz. Descubre quiénes son los mejores jugadores en este Global Flag Quiz Game.",
    url: `${siteUrl}/ranking`,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "World Flags Quiz - Ranking Global",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ranking Global - World Flags Quiz",
    description: "Consulta el ranking global de World Flags Quiz. Descubre quiénes son los mejores jugadores en este Global Flag Quiz Game.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/ranking`,
  },
};

export default function RankingPage() {
  return <RankingClient />;
}
