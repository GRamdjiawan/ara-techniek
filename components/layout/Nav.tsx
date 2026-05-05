"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LogoSVG } from "@/components/LogoSVG"
import { navLinks } from "@/lib/constants"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="flex items-center justify-between px-6 lg:px-12 transition-all duration-300"
        style={{
          backgroundColor: "rgba(255,255,255,0.97)",
          borderBottom: "1px solid var(--border)",
          height: scrolled ? "64px" : "88px",
        }}
      >
        <a href="#" aria-label="ARA-Techniek naar boven">
          <motion.div
            animate={{ height: scrolled ? 56 : 80 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden flex items-center"
          >
            <LogoSVG className="h-full w-auto" />
          </motion.div>
        </a>

        <nav aria-label="Hoofdnavigatie" className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium tracking-wide transition-colors text-[var(--gray)] hover:text-[var(--ink)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="px-5 py-2.5 text-xs font-bold tracking-widest uppercase bg-[var(--purple)] text-white hover:bg-[var(--purple-dim)] transition-colors"
          >
            Offerte aanvragen
          </a>
        </nav>

        <button
          className="md:hidden p-2 text-[var(--ink)]"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobiele navigatie"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b border-[var(--border)]"
          >
            <ul className="flex flex-col list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block px-6 py-4 text-sm font-medium text-[var(--gray)] border-b border-[var(--border)] hover:text-[var(--ink)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="p-4">
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center px-5 py-3 text-xs font-bold tracking-widest uppercase bg-[var(--purple)] text-white"
                >
                  Offerte aanvragen
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
