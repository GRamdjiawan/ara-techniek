"use client"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost"
  as?: "button" | "a"
  href?: string
}

export function Button({ variant = "primary", className, children, as = "button", href, ...props }: ButtonProps) {
  const reduced = useReducedMotion()
  const base = "inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold tracking-widest uppercase transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[var(--purple)] focus-visible:ring-offset-2"
  const variants = {
    primary: "bg-[var(--purple)] text-white hover:bg-[var(--purple-dim)]",
    outline: "border border-[var(--purple)] text-[var(--purple)] hover:bg-[var(--purple)] hover:text-white",
    ghost: "border border-white text-white hover:bg-white hover:text-[var(--ink)]",
  }
  const Tag = as === "a" ? motion.a : motion.button
  return (
    <Tag
      href={href}
      className={cn(base, variants[variant], className)}
      whileHover={reduced ? {} : { y: -2 }}
      whileTap={reduced ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      {...(props as any)}
    >
      {children}
    </Tag>
  )
}
