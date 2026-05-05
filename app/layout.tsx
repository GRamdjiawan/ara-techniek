import type { Metadata } from "next"
import { Space_Grotesk } from "next/font/google"
import "./globals.css"
import { Nav } from "@/components/layout/Nav"
import { Footer } from "@/components/layout/Footer"
import { Modal } from "@/components/Modal"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://ara-techniek.nl"),
  title: {
    default: "ARA-Techniek Constructie & Elektra Dienstverlening",
    template: "%s | ARA-Techniek",
  },
  description: "ARA-Techniek levert professionele constructie- en elektradienstverlening voor bedrijven en particulieren. Vakkundig team, op tijd, binnen budget. Vraag vrijblijvend een offerte aan.",
  keywords: ["ARA-Techniek", "constructie dienstverlening", "elektra installatie", "bedrading", "renovatie", "installatiebedrijf", "elektricien"],
  authors: [{ name: "ARA-Techniek", url: "https://ara-techniek.nl" }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  alternates: { canonical: "https://ara-techniek.nl" },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://ara-techniek.nl",
    siteName: "ARA-Techniek",
    title: "ARA-Techniek Constructie & Elektra Dienstverlening",
    description: "Professionele constructie- en elektradienstverlening. Vakkundig team, op tijd, binnen budget.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "ARA-Techniek logo" }],
  },
  twitter: { card: "summary_large_image", title: "ARA-Techniek", description: "Professionele constructie- en elektradienstverlening." },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  manifest: "/site.webmanifest",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" dir="ltr" className={spaceGrotesk.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[var(--purple)] focus:text-white focus:px-4 focus:py-2 focus:font-bold focus:text-sm"
        >
          Ga naar hoofdinhoud
        </a>
        <Nav />
        <Modal />
        {children}
        <Footer />
      </body>
    </html>
  )
}
