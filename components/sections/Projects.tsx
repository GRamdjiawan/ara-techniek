"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/Label"
import { projects } from "@/lib/constants"

interface TileProps {
  project: (typeof projects)[number]
  colSpan?: number
  index: number
}

function Tile({ project, colSpan = 1, index }: TileProps) {
  return (
    <motion.li
      className="relative overflow-hidden group aspect-[4/3] lg:aspect-auto"
      style={{ gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined }}
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.06 }}
    >
      <Image
        src={`https://images.unsplash.com/${project.id}?w=900&q=80`}
        alt={`${project.tag}: ${project.label}`}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        style={{ filter: "saturate(0.6) brightness(0.7)" }}
      />

      {/* Permanent dark gradient so text is always readable */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(9,11,30,.88) 0%, rgba(9,11,30,.3) 55%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* Purple hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(to top, rgba(45,46,170,.85) 0%, rgba(45,46,170,.15) 60%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* Text — always visible, no hover dependency */}
      <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4">
        <p
          className="font-bold tracking-[0.14em] uppercase mb-1"
          style={{ fontSize: "clamp(8px, 1.2vw, 10px)", color: "rgba(255,255,255,0.55)" }}
        >
          {project.tag}
        </p>
        <p
          className="font-semibold leading-snug"
          style={{ fontSize: "clamp(11px, 1.4vw, 13px)", color: "#ffffff" }}
        >
          {project.label}
        </p>
      </div>
    </motion.li>
  )
}

export function Projects() {
  return (
    <section
      id="projecten"
      aria-labelledby="projects-heading"
      className="py-24"
      style={{ backgroundColor: "var(--navy)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <Label light className="mb-4">Projecten</Label>
          <h2
            id="projects-heading"
            className="font-bold"
            style={{ fontSize: "clamp(2rem,3vw,3rem)", letterSpacing: "-0.022em", color: "#ffffff" }}
          >
            Projecten van ARA-Techniek
          </h2>
        </div>

        {/*
          Mobile:  2-column grid, aspect-[4/3] on each tile, wide tiles go full-width
          Desktop: 4-column grid with explicit equal row heights (bento layout)

          Row 1: [wide ×2][normal][normal]
          Row 2: [normal][normal][wide ×2]
        */}
        <ul
          className="list-none p-0 m-0 grid gap-[3px] grid-cols-2 lg:grid-cols-4 project-bento"
          aria-label="Projecten"
        >
          <Tile project={projects[0]} colSpan={2} index={0} />
          <Tile project={projects[1]} index={1} />
          <Tile project={projects[2]} index={2} />
          <Tile project={projects[3]} index={3} />
          <Tile project={projects[4]} index={4} />
          <Tile project={projects[5]} colSpan={2} index={5} />
        </ul>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white text-sm font-bold tracking-widest uppercase transition-colors duration-200 hover:bg-white hover:text-[var(--ink)]"
            style={{ color: "#ffffff" }}
          >
            Bespreek uw project →
          </a>
        </div>
      </div>
    </section>
  )
}
