import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bandera Rush - Juego de Adivinar Banderas del Mundo",
  description: "Juego interactivo y divertido para adivinar banderas del mundo. Compite en el ranking global con otros jugadores.",
  keywords: "banderas, quiz, juego, adivinanza, ranking, mundial, países",
  authors: [{ name: "Edisson López" }],
  openGraph: {
    title: "Bandera Rush - Juego de Adivinar Banderas",
    description: "Adivina banderas del mundo y compite en el ranking global",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}

