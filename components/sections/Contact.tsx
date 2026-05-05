"use client"
import { useState } from "react"
import { Label } from "@/components/ui/Label"
import { siteConfig } from "@/lib/constants"

export function Contact() {
  const [form, setForm] = useState({ fname: "", lname: "", email: "", phone: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.fname.trim()) e.fname = "Voornaam is verplicht"
    if (!form.lname.trim()) e.lname = "Achternaam is verplicht"
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Geldig e-mailadres is verplicht"
    if (!form.message.trim() || form.message.length < 10) e.message = "Bericht is verplicht (min. 10 tekens)"
    return e
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      setStatus("error")
      const firstError = Object.keys(errs)[0]
      document.getElementById(firstError)?.focus()
      setTimeout(() => setStatus("idle"), 2500)
      return
    }
    setErrors({})
    setStatus("sending")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
      setForm({ fname: "", lname: "", email: "", phone: "", message: "" })
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  const inputClass = "w-full px-4 py-3 border border-[var(--border)] bg-white text-[var(--ink)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--purple)] focus:border-transparent placeholder:text-[var(--muted)]"

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-[var(--border)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left - info */}
        <div className="bg-[var(--purple)] px-8 py-16 lg:px-14 lg:py-20 flex flex-col justify-center">
          <Label light className="mb-4">Contact</Label>
          <h2 id="contact-heading" className="text-white font-bold mb-8" style={{ fontSize: "clamp(2rem,3vw,3rem)", letterSpacing: "-0.022em" }}>
            Klaar om samen te werken?
          </h2>

          <div className="flex flex-col gap-4 mb-8">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors text-sm"
              aria-label={`Stuur een e-mail naar ARA-Techniek: ${siteConfig.email}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {siteConfig.email}
            </a>
            <a
              href={`https://${siteConfig.website}`}
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors text-sm"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Bezoek website: ${siteConfig.website} (opent in nieuw venster)`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 3c-4.418 5.603-4.418 12.397 0 18M12 3c4.418 5.603 4.418 12.397 0 18M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {siteConfig.website}
            </a>
          </div>

          <p className="text-white/45 text-[13px] leading-relaxed">
            Vrijblijvende offerte aanvragen? Stuur een bericht wij reageren binnen 24 uur.
          </p>
        </div>

        {/* Right - form */}
        <div className="bg-white px-8 py-16 lg:px-14 lg:py-20 border-l border-[var(--border)]">
          <Label className="mb-6">Stuur een bericht</Label>

          <div role="alert" aria-live="polite" id="form-feedback" className="sr-only">
            {status === "success" ? "Bericht verzonden. Wij nemen contact op." : status === "error" ? "Er ging iets mis. Probeer opnieuw." : ""}
          </div>

          <form noValidate onSubmit={handleSubmit} aria-label="Contactformulier" className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fname" className="block text-xs font-bold tracking-wide text-[var(--ink)] mb-1.5">Voornaam</label>
                <input id="fname" name="fname" type="text" autoComplete="given-name" aria-required="true"
                  aria-invalid={errors.fname ? "true" : "false"}
                  aria-describedby={errors.fname ? "fname-error" : undefined}
                  className={inputClass} value={form.fname} onChange={e => setForm(f => ({ ...f, fname: e.target.value }))} />
                {errors.fname && <p id="fname-error" role="alert" className="text-red-600 text-xs mt-1">{errors.fname}</p>}
              </div>
              <div>
                <label htmlFor="lname" className="block text-xs font-bold tracking-wide text-[var(--ink)] mb-1.5">Achternaam</label>
                <input id="lname" name="lname" type="text" autoComplete="family-name" aria-required="true"
                  aria-invalid={errors.lname ? "true" : "false"}
                  aria-describedby={errors.lname ? "lname-error" : undefined}
                  className={inputClass} value={form.lname} onChange={e => setForm(f => ({ ...f, lname: e.target.value }))} />
                {errors.lname && <p id="lname-error" role="alert" className="text-red-600 text-xs mt-1">{errors.lname}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="femail" className="block text-xs font-bold tracking-wide text-[var(--ink)] mb-1.5">E-mailadres <span className="text-[var(--purple)]">*</span></label>
              <input id="femail" name="email" type="email" autoComplete="email" aria-required="true"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              {errors.email && <p id="email-error" role="alert" className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="fphone" className="block text-xs font-bold tracking-wide text-[var(--ink)] mb-1.5">
                Telefoonnummer <span className="text-[var(--muted)] font-normal">(optioneel)</span>
              </label>
              <input id="fphone" name="phone" type="tel" autoComplete="tel"
                className={inputClass} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
            </div>

            <div>
              <label htmlFor="fmsg" className="block text-xs font-bold tracking-wide text-[var(--ink)] mb-1.5">Beschrijf uw project <span className="text-[var(--purple)]">*</span></label>
              <textarea id="fmsg" name="message" rows={4} aria-required="true"
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={inputClass + " resize-none"} value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              {errors.message && <p id="message-error" role="alert" className="text-red-600 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              aria-describedby="form-feedback"
              className={`w-full py-4 text-sm font-bold tracking-widest uppercase text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                status === "success" ? "bg-green-600" :
                status === "error" ? "bg-red-600" :
                "bg-[var(--purple)] hover:bg-[var(--purple-dim)]"
              }`}
            >
              {status === "success" ? "Verzonden ✓" :
               status === "error" ? "Er ging iets mis" :
               status === "sending" ? "Verzenden..." :
               "Verstuur bericht →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
