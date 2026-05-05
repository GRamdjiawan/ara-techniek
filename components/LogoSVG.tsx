import Image from "next/image"

export function LogoSVG({ className }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="ARA-Techniek logo"
      width={220}
      height={110}
      className={className}
      role="img"
      aria-label="ARA-Techniek logo"
    />
  )
}
