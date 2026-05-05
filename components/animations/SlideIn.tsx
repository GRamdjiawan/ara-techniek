"use client"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

interface SlideInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "left" | "right"
}

export function SlideIn({ children, className, delay = 0, direction = "left" }: SlideInProps) {
  const reduced = useReducedMotion()
  const x = direction === "left" ? -40 : 40
  return (
    <motion.div
      className={cn(className)}
      initial={reduced ? { opacity: 1 } : { opacity: 0, x }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
