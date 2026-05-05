import dynamic from "next/dynamic"
import Script from "next/script"
import { Hero } from "@/components/sections/Hero"
import { Strip } from "@/components/sections/Strip"
import { About } from "@/components/sections/About"
import { Services } from "@/components/sections/Services"
import { Reviews } from "@/components/sections/Reviews"
import { Contact } from "@/components/sections/Contact"

const Projects = dynamic(() => import("@/components/sections/Projects").then(m => ({ default: m.Projects })), {
  loading: () => <div className="h-96" style={{ backgroundColor: "var(--navy)" }} />,
})

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ara-techniek.nl/#business",
  "name": "ARA-Techniek",
  "description": "Professionele constructie- en elektradienstverlening voor bedrijven en particulieren in Nederland.",
  "url": "https://ara-techniek.nl",
  "telephone": "+31612345678",
  "email": "info@ara-techniek.nl",
  "foundingDate": "2008",
  "areaServed": { "@type": "Country", "name": "Nederland" },
  "serviceType": ["Elektra installatie", "Constructiedienstverlening", "Kabelwerk en bedrading", "Renovatie"],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "3", "bestRating": "5" },
  "review": [
    { "@type": "Review", "author": { "@type": "Person", "name": "Dennis de Jong" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Via via ben ik bij de dienstverlening van ARA-Techniek gekomen. Goede service en het project werd geleverd zoals beloofd." },
    { "@type": "Review", "author": { "@type": "Person", "name": "Jeroen Mederkamp" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Professioneel team en goede uitvoering. Alles liep soepel en werd op tijd opgeleverd." },
    { "@type": "Review", "author": { "@type": "Person", "name": "Hans Konokens" }, "reviewRating": { "@type": "Rating", "ratingValue": "5" }, "reviewBody": "Grote klus uit laten voeren door ARA-Techniek, is gegaan zoals verwacht. Zeker een aanrader!" },
  ],
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://ara-techniek.nl/#website",
  "url": "https://ara-techniek.nl",
  "name": "ARA-Techniek",
  "inLanguage": "nl-NL",
  "publisher": { "@id": "https://ara-techniek.nl/#business" },
}

export default function Page() {
  return (
    <>
      <Script id="schema-localbusiness" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="schema-website" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Strip />
        <About />
        <Services />
        <Reviews />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
