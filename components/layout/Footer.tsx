import { LogoSVG } from "@/components/LogoSVG"
import { navLinks, siteConfig } from "@/lib/constants"
import { Label } from "@/components/ui/Label"

export function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <LogoSVG className="h-22 w-auto mb-4" />
            <p className="text-[var(--muted)] text-[13px] leading-relaxed max-w-[200px]">
              Professionele dienstverlening in de bouw- en constructiesector.
            </p>
          </div>

          <div>
            <Label className="mb-4">Website Links</Label>
            <ul className="flex flex-col gap-2 list-none p-0 m-0 mt-4">
              <li><a href="#" className="text-sm text-[var(--gray)] hover:text-[var(--ink)] flex items-center gap-2"><span className="text-[var(--purple)]">›</span> Home</a></li>
              {navLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-[var(--gray)] hover:text-[var(--ink)] flex items-center gap-2">
                    <span className="text-[var(--purple)]">›</span> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Label className="mb-4">Contact</Label>
            <div className="flex flex-col gap-3 mt-4">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm text-[var(--gray)] hover:text-[var(--ink)]"
                aria-label="Stuur een e-mail naar ARA-Techniek">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {siteConfig.email}
              </a>
              <a href={siteConfig.phoneHref} className="flex items-center gap-2 text-sm text-[var(--gray)] hover:text-[var(--ink)]"
                aria-label={`Bel ARA-Techniek: ${siteConfig.phone}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                {siteConfig.phone}
              </a>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-bold px-4 py-2 hover:brightness-95 transition-all mt-1"
                aria-label="Stuur WhatsApp bericht (opent in nieuw venster)"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-[var(--muted)] text-xs">© 2024 ARA-Techniek</p>
          <p className="text-[var(--muted)] text-xs">{siteConfig.website}</p>
        </div>
      </div>
    </footer>
  )
}
