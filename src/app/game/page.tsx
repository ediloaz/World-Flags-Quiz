import type { Metadata } from "next";
import GameClient from "./GameClient";

const siteUrl = "https://world-flags-quiz.ediloaz.com";

export const metadata: Metadata = {
  title: "Jugar - World Flags Quiz",
  description: "Juega World Flags Quiz ahora. Adivina banderas del mundo, compite contra el tiempo y demuestra tus conocimientos de geografía en este Global Flag Quiz Game.",
  keywords: [
    "jugar world flags quiz",
    "juego de banderas",
    "adivinar banderas",
    "flag quiz game",
    "geography game",
    "juego de geografía",
  ],
  openGraph: {
    title: "Jugar World Flags Quiz – Global Flag Guessing Game",
    description: "Juega World Flags Quiz ahora. Adivina banderas del mundo, compite contra el tiempo y demuestra tus conocimientos de geografía.",
    url: `${siteUrl}/game`,
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
    title: "Jugar World Flags Quiz – Global Flag Guessing Game",
    description: "Juega World Flags Quiz ahora. Adivina banderas del mundo, compite contra el tiempo y demuestra tus conocimientos de geografía.",
    images: [`${siteUrl}/og-image.jpg`],
  },
  alternates: {
    canonical: `${siteUrl}/game`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function GamePage() {
  return <GameClient />;
}
