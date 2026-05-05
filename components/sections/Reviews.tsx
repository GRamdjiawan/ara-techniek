"use client"
import { useMotionValue, useAnimationFrame, motion } from "framer-motion"
import { Label } from "@/components/ui/Label"
import { reviews } from "@/lib/constants"

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1" aria-label={`${count} sterren`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="var(--purple)" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

const CARD_WIDTH = 420
const GAP = 24
const STRIDE = CARD_WIDTH + GAP
// Triple the reviews so the loop never shows a gap
const ITEMS = [...reviews, ...reviews, ...reviews]
const LOOP_WIDTH = STRIDE * reviews.length

export function Reviews() {
  const x = useMotionValue(0)

  useAnimationFrame((_, delta) => {
    const next = x.get() - (delta / 1000) * 48
    x.set(next <= -LOOP_WIDTH ? next + LOOP_WIDTH : next)
  })

  return (
    <section aria-labelledby="reviews-heading" className="py-24 border-b border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Label className="mb-4">Reviews</Label>
            <h2
              id="reviews-heading"
              className="font-bold"
              style={{ fontSize: "clamp(2rem,3vw,3rem)", letterSpacing: "-0.022em", color: "var(--ink)" }}
            >
              Klantbeoordelingen
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Stars />
            <span className="text-sm font-bold" style={{ color: "var(--ink)" }}>5.0 gemiddeld</span>
          </div>
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24"
          style={{ background: "linear-gradient(to right, #fff 0%, transparent 100%)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24"
          style={{ background: "linear-gradient(to left, #fff 0%, transparent 100%)" }}
          aria-hidden="true"
        />

        <motion.ul
          style={{ x }}
          className="flex list-none m-0 p-0"
          aria-label="Klantbeoordelingen"
        >
          {ITEMS.map((review, i) => (
            <li
              key={`${review.name}-${i}`}
              style={{ width: CARD_WIDTH, flexShrink: 0, marginRight: GAP }}
              className="bg-[var(--surface)] border border-[var(--border)] px-8 py-10"
            >
              <Stars />
              <blockquote
                className="mt-6 mb-6 text-sm leading-relaxed italic"
                style={{ color: "var(--gray)" }}
              >
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <div>
                <p className="text-sm font-bold" style={{ color: "var(--ink)" }}>{review.name}</p>
                <p className="text-xs tracking-wide" style={{ color: "var(--muted)" }}>{review.project}</p>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
