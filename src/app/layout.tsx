import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "World Flags Arena",
  description:
    "Juego interactivo de banderas con ranking global, niveles y protección anti-bots.",
  metadataBase: new URL("https://world-flags-arena.example.com"),
  openGraph: {
    title: "World Flags Arena",
    description:
      "Compite adivinando banderas, escala posiciones y demuestra tu memoria geográfica.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-slate-950`}>
        {children}
      </body>
    </html>
  );
}
