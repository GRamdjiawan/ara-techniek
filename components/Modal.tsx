"use client"
import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useFocusTrap } from "@/hooks/useFocusTrap"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { siteConfig } from "@/lib/constants"

export function Modal() {
  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const triggerRef = useRef<HTMLElement | null>(null)
  const reduced = useReducedMotion()
  const containerRef = useFocusTrap(show)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setShow(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [show])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  const close = () => {
    setShow(false)
    triggerRef.current?.focus()
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {show && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
        >
          <motion.div
            className="absolute inset-0 bg-[rgba(10,12,28,0.72)] backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden="true"
          />
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative bg-white w-full max-w-[460px] z-10"
            initial={reduced ? {} : { opacity: 0, scale: 0.96, y: 28 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
          >
            {/* Header */}
            <div className="bg-[var(--purple)] p-8 relative">
              <button
                onClick={close}
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Modal sluiten"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <h2 id="modal-title" className="text-white! text-2xl font-bold mb-1">
                Spoed?
              </h2>
              <p className="text-white/65 text-sm">
                Neem direct contact op
              </p>
            </div>

            {/* Body */}
            <div className="p-8 flex flex-col gap-4">
              <p className="text-[var(--gray)] text-sm leading-relaxed">
                Heeft u een vraag of wilt u een offerte aanvragen? Neem direct contact op via telefoon of WhatsApp.
              </p>

              <a
                href={siteConfig.phoneHref}
                className="flex items-center gap-4 bg-[var(--purple)] px-5 py-4 text-white hover:bg-[var(--purple-dim)] transition-colors"
                aria-label={`Bel ARA-Techniek: ${siteConfig.phone}`}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <div>
                  <div className="text-[11px] font-bold tracking-widest uppercase text-white/75">Telefoon</div>
                  <div className="text-[15px] font-bold">Bel ons direct</div>
                </div>
              </a>

              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#25D366] px-5 py-4 text-white hover:brightness-95 transition-all"
                aria-label="Stuur WhatsApp bericht (opent in nieuw venster)"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div>
                  <div className="text-[11px] font-bold tracking-widest uppercase text-white/75">WhatsApp</div>
                  <div className="text-[15px] font-bold">Stuur een bericht</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
