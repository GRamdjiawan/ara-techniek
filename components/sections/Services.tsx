"use client"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { Label } from "@/components/ui/Label"
import { services } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

export function Services() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(() => {
    if (reduced) return
    gsap.from(".service-card", {
      opacity: 0, scale: 0.95, duration: 0.5, stagger: 0.1,
      scrollTrigger: { trigger: ref.current, start: "top 80%" }
    })
  }, { scope: ref })

  return (
    <section
      ref={ref}
      id="diensten"
      aria-labelledby="services-heading"
      className="bg-[var(--purple)] py-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <Label light className="mb-4">ARA-Techniek</Label>
            <h2 id="services-heading" className="text-white font-bold" style={{ fontSize: "clamp(2rem,3vw,3rem)", letterSpacing: "-0.022em" }}>
              Ervaar onze kennis en mogelijkheden
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-white/60 text-base leading-relaxed">
              Wij werken met veel verschillende klanten samen. Al onze klanten en projecten zijn stuk voor stuk uniek en worden met zorg behandeld door ons vakkundige team.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {services.map((service) => (
            <div
              key={service.num}
              className="service-card bg-white/[0.07] hover:bg-white/[0.13] transition-colors px-9 py-11 cursor-default"
            >
              {/* <div className="text-white/30 text-xs font-bold tracking-widest uppercase mb-6">
                {service.num}
              </div> */}
              <h3 className="text-white text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{service.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
