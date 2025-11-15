import type { Metadata } from "next";
import HomeClient from "./HomeClient";

const siteUrl = "https://world-flags-quiz.ediloaz.com";

export const metadata: Metadata = {
  title: "Inicio - World Flags Quiz",
  description: "Reta tus conocimientos de geografía con World Flags Quiz. Adivina banderas, compite contra el tiempo y escala en el ranking global. Global Flag Quiz Game - Juego educativo de geografía.",
  keywords: [
    "world flags quiz",
    "global flag quiz",
    "banderas del mundo",
    "juego de banderas",
    "flag guessing game",
    "geography quiz",
    "quiz de geografía",
    "adivinar banderas",
    "ranking global",
    "flag game",
    "country flags",
    "world geography",
    "ediloaz",
  ],
  openGraph: {
    title: "World Flags Quiz – Global Flag Guessing Game by Ediloaz",
    description: "Reta tus conocimientos de geografía con World Flags Quiz. Adivina banderas, compite contra el tiempo y escala en el ranking global.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "World Flags Quiz - Global Flag Guessing Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "World Flags Quiz – Global Flag Guessing Game by Ediloaz",
    description: "Reta tus conocimientos de geografía con World Flags Quiz. Adivina banderas, compite contra el tiempo y escala en el ranking global.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function Home() {
  return <HomeClient />;
}
