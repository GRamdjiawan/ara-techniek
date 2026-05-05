import { cn } from "@/lib/utils"

export function Label({ children, className, light }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <span className={cn(
      "relative inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.15em] uppercase",
      light ? "text-[rgba(255,255,255,0.6)]" : "text-[var(--purple)]",
      "before:content-[''] before:block before:w-6 before:h-px",
      light ? "before:bg-[rgba(255,255,255,0.4)]" : "before:bg-[var(--purple)]",
      className
    )}>
      {children}
    </span>
  )
}
