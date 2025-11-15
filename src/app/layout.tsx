import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://world-flags-quiz.ediloaz.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "World Flags Quiz – Global Flag Guessing Game by Ediloaz",
    template: "%s | World Flags Quiz",
  },
  description: "Reta tus conocimientos de geografía con World Flags Quiz. Adivina banderas, compite contra el tiempo y escala en el ranking global.",
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
  authors: [{ name: "Ediloaz", url: "https://www.ediloaz.com" }],
  creator: "Ediloaz",
  publisher: "ediloaz.com",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "World Flags Quiz",
    title: "World Flags Quiz – Global Flag Guessing Game by Ediloaz",
    description: "Reta tus conocimientos de geografía con World Flags Quiz. Adivina banderas, compite contra el tiempo y escala en el ranking global.",
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
    creator: "@ediloaz",
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = "https://world-flags-quiz.ediloaz.com";
  
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "World Flags Quiz",
    url: siteUrl,
    description: "Reta tus conocimientos de geografía con World Flags Quiz. Adivina banderas, compite contra el tiempo y escala en el ranking global.",
    publisher: {
      "@type": "Organization",
      name: "Ediloaz",
      url: "https://www.ediloaz.com",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "Game",
    name: "World Flags Quiz",
    description: "Global Flag Guessing Game - Reta tus conocimientos de geografía adivinando banderas del mundo. Compite contra el tiempo y escala en el ranking global.",
    url: siteUrl,
    applicationCategory: "EducationalGame",
    gameLocation: "Online",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "Ediloaz",
      url: "https://www.ediloaz.com",
    },
    genre: ["Educational", "Quiz", "Geography"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "100",
    },
  };

  return (
    <html lang="es">
      <body className="antialiased">
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Script
          id="game-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

