import type { Metadata } from "next";
import { Fraunces, Newsreader, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ReadingShell } from "@/components/layout/reading-shell";
import { GateDemoToggle } from "@/components/gate/gate-demo-toggle";

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

const BASE_URL = "https://praxia.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Praxia â€” The route from first principles to the frontier",
    template: "%s Â· Praxia",
  },
  description:
    "An opinionated, end-to-end map of the journey through Data and AI â€” Foundations, Data Analyst, Data Scientist, ML Engineer, AI Engineer, and a Research track. Curated resources, sequenced the way you'd actually learn them.",
  openGraph: {
    type: "website",
    siteName: "Praxia",
    title: "Praxia â€” The route from first principles to the frontier",
    description:
      "One hand-drawn map of the whole territory. Curated, ranked, sequenced: what to learn, in what order, to what depth.",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Praxia â€” The route from first principles to the frontier",
    description:
      "One hand-drawn map of the whole territory. Curated, ranked, sequenced: what to learn, in what order, to what depth.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Praxia â€” The route from first principles to the frontier",
  description:
    "An opinionated, end-to-end learning map for Data and AI â€” Foundations through AI Engineering, with a Research track.",
  url: BASE_URL,
  provider: {
    "@type": "Organization",
    name: "Praxia",
    url: BASE_URL,
  },
  hasCourseInstance: [
    { "@type": "CourseInstance", name: "Foundations", courseMode: "online" },
    { "@type": "CourseInstance", name: "Data Analyst", courseMode: "online" },
    {
      "@type": "CourseInstance",
      name: "Data Scientist",
      courseMode: "online",
    },
    { "@type": "CourseInstance", name: "ML Engineer", courseMode: "online" },
    { "@type": "CourseInstance", name: "AI Engineer", courseMode: "online" },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#content" className="skip-link">
            Skip to content
          </a>
          <SiteHeader />
          <ReadingShell>{children}</ReadingShell>
          <SiteFooter />
          {/* Cosmetic gate demo toggle â€” floating, bottom-right (Part B4, Â§4) */}
          <GateDemoToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
