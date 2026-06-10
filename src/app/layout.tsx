import type { Metadata } from "next";
import { Fraunces, Newsreader, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Field Notebook type system (PROJECT_PLAN §3.3) — self-hosted via next/font.
// Display + body serifs, a handwritten face for marginalia, mono for code.
// Deliberately NO Inter/Roboto anywhere.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Atlas — the route from first principles to the frontier",
    template: "%s · The Atlas",
  },
  description:
    "An opinionated, end-to-end map of the journey through Data and AI — foundations, data analysis, data science, ML engineering, AI engineering, and the research track. Curated resources, sequenced the way you would actually learn them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${newsreader.variable} ${caveat.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
