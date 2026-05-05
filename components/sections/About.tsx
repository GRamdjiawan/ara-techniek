"use client"
import { useRef } from "react"
import Image from "next/image"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { Label } from "@/components/ui/Label"

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(() => {
    if (reduced) return
    gsap.from(".about-img", {
      opacity: 0, x: -40, duration: 0.7,
      scrollTrigger: { trigger: ref.current, start: "top 80%" }
    })
    gsap.from(".about-content", {
      opacity: 0, x: 40, duration: 0.7,
      scrollTrigger: { trigger: ref.current, start: "top 80%" }
    })
  }, { scope: ref })

  return (
    <section
      ref={ref}
      id="over-ons"
      aria-labelledby="about-heading"
      className="border-b border-[var(--border)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="about-img relative h-72 lg:h-auto overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=900&q=85"
            alt="ARA-Techniek medewerker voert elektra installatiewerk uit"
            fill
            className="object-cover transition-transform duration-[6000ms] group-hover:scale-[1.04]"
          />
          <div className="absolute bottom-4 left-4 bg-[var(--purple)] px-3 py-1.5">
            <span className="text-white text-[11px] font-bold tracking-widest uppercase">
              Constructie Specialist
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="about-content flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-20">
          <Label className="mb-4">Over ARA-Techniek</Label>
          <h2 id="about-heading" className="font-bold text-[var(--ink)] mb-6" style={{ fontSize: "clamp(2rem,3vw,3rem)", letterSpacing: "-0.022em" }}>
            Constructie dienstverlening
          </h2>
          <p className="text-[var(--gray)] leading-relaxed mb-6">
            ARA-Techniek biedt bedrijven en particulieren de mogelijkheid om professionele projecten in de bouw- en constructiesector te bewerkstellingen. Door een team van professionals zorgen wij ervoor dat de klant en de dienstverlening centraal staat.
          </p>
          <blockquote
            className="border-l-[3px] border-[var(--purple)] bg-[var(--purple-bg)] pl-5 pr-4 py-4 italic text-[var(--gray)] text-sm leading-relaxed"
          >
            &ldquo;Hoe vaak komt het voor dat projecten niet geleverd worden zoals u echt had gewild? Niet bij ARA-Techniek.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  )
}
