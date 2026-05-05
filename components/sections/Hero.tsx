"use client"
import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { stats } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

const ease = [0.25, 0.46, 0.45, 0.94] as const

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease, delay },
  }
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(() => {
    // Ken Burns — scale image in slowly
    if (!reduced) {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 14, ease: "power1.out" }
      )
    }

    // Count-up — must use gsap.to on a plain object, not gsap.from
    stats.forEach((stat, i) => {
      const el = document.querySelector(`.stat-num-${i}`)
      if (!el) return
      const obj = { val: 0 }
      gsap.to(obj, {
        val: stat.number,
        duration: 2.2,
        delay: reduced ? 0 : 1.8 + i * 0.1,
        ease: "power2.out",
        onUpdate() {
          el.textContent = Math.round(obj.val) + stat.suffix
        },
      })
    })
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      id="home"
      aria-labelledby="hero-heading"
      className="relative h-screen min-h-[600px] flex flex-col"
    >
      {/* Background image */}
      <div ref={imgRef} className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=90"
          alt=""
          fill
          priority
          className="object-cover"
          fetchPriority="high"
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(9,11,30,.78) 0%, rgba(9,11,30,.62) 50%, rgba(9,11,30,.88) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24">

        {/* Eyebrow */}
        <motion.div {...fadeUp(0.15)} className="flex items-center gap-6 mb-6">
          <span className="hidden md:block w-6 h-px bg-white/40" aria-hidden="true" />
          <span
            className="text-[11px] font-bold tracking-[0.18em] uppercase"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Elektra &amp; Constructie Specialist
          </span>
          <span className="hidden md:block w-6 h-px bg-white/40" aria-hidden="true" />
        </motion.div>

        {/* H1 — clip reveal */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            id="hero-heading"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.95, ease, delay: 0.3 }}
            style={{
              fontSize: "clamp(3rem,6.5vw,7rem)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              textShadow: "0 2px 8px rgba(0,0,0,0.45)",
            }}
          >
            ARA-Techniek
          </motion.h1>
        </div>

        {/* Purple divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.45, delay: 0.85, ease: "easeOut" }}
          style={{ transformOrigin: "center" }}
          className="w-0.5 h-9 bg-[var(--purple)] mx-auto my-2"
          aria-hidden="true"
        />

        {/* Sub heading */}
        <motion.h2
          {...fadeUp(1.0)}
          className="mb-4"
          style={{
            fontSize: "clamp(1.4rem,3vw,2.2rem)",
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          Dienstverlening
        </motion.h2>

        {/* Lead */}
        <motion.p
          {...fadeUp(1.15)}
          className="text-[17px] max-w-[520px] leading-relaxed mb-8"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          Professionele dienstverlening in de bouw- en constructiesector.
          Wij zorgen dat het werk goed wordt gedaan de eerste keer.
        </motion.p>

        {/* CTA */}
        <motion.a
          {...fadeUp(1.35)}
          href="#over-ons"
          className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[var(--ink)] text-sm font-bold tracking-widest uppercase hover:bg-[var(--purple)] hover:text-white transition-colors duration-200"
        >
          Over Ons
        </motion.a>
      </div>


      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.6, ease }}
        className="relative z-20 hidden md:grid grid-cols-4"
        style={{
          background: "rgba(9,11,30,.5)",
          borderTop: "1px solid rgba(255,255,255,.1)",
        }}
        aria-label="Statistieken"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center py-5 gap-1"
            style={{
              borderRight:
                i < stats.length - 1 ? "1px solid rgba(255,255,255,.1)" : "none",
            }}
          >
            <span
              className={`stat-num-${i} text-[2rem] font-bold leading-none`}
              style={{ color: "#ffffff" }}
            >
              {stat.number}{stat.suffix}
            </span>
            <span
              className="text-[10px] font-bold tracking-[0.14em] uppercase"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
