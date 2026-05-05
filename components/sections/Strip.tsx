"use client"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "@/hooks/useReducedMotion"

gsap.registerPlugin(ScrollTrigger)

const items = [
  { icon: "✓", text: "Professioneel team van gekwalificeerde vakmensen" },
  { icon: "⏱", text: "Op tijd & binnen het afgesproken budget" },
  { icon: "🛡", text: "Klant en kwaliteit staan altijd centraal" },
]

export function Strip() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(() => {
    if (reduced) return
    gsap.from(".strip-item", {
      opacity: 0, y: 20, duration: 0.5, stagger: 0.1,
      scrollTrigger: { trigger: ref.current, start: "top 85%" }
    })
  }, { scope: ref })

  return (
    <section ref={ref} className="border-b border-[var(--border)]" aria-label="Kernwaarden">
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto">
        {items.map((item, i) => (
          <div
            key={i}
            className="strip-item flex items-center gap-4 px-8 py-6"
            style={{ borderRight: i < items.length - 1 ? "1px solid var(--border)" : "none" }}
          >
            <span
              className="flex-shrink-0 w-9 h-9 bg-[var(--purple)] flex items-center justify-center text-white text-sm"
              aria-hidden="true"
            >
              {item.icon}
            </span>
            <p className="text-sm text-[var(--gray)] font-medium">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
