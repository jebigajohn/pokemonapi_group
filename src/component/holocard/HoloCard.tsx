import React, { useEffect, useRef, forwardRef } from "react"
import gsap from "gsap"

type HoloCardProps = {
  children: React.ReactNode
  className?: string
  as?: "div" | "button" | "a"
  onClick?: React.MouseEventHandler<HTMLElement>
  href?: string
  "aria-label"?: string
}

const HoloCard = forwardRef<HTMLElement, HoloCardProps>(function HoloCard(
  { children, className = "", as = "div", onClick, href, ...rest },
  _ref
) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLElement>(null) // <- .holo Element
  const cardRef = useRef<HTMLDivElement>(null)

  // Initialwerte setzen, damit der Effekt sofort sichtbar ist
  useEffect(() => {
    if (!containerRef.current) return
    gsap.set(containerRef.current, {
      "--mx": "50%",
      "--my": "50%",
      "--angle": "45deg",
    } as any)
  }, [])

  const onMove = (e: React.MouseEvent) => {
    // Touchpointer ignorieren (mobil: nur Tap)
    // @ts-ignore
    if (e?.nativeEvent?.pointerType === "touch") return

    const wrap = wrapRef.current!
    const rect = wrap.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const mx = x / rect.width
    const my = y / rect.height

    // Sanfterer Tilt
    const rotateY = (mx - 0.5) * 14
    const rotateX = (0.5 - my) * 10

    gsap.to(cardRef.current!, {
      rotateY,
      rotateX,
      translateZ: 12,
      transformPerspective: 800,
      ease: "expo.out",
      duration: 0.45,
    })

    gsap.to(containerRef.current!, {
      "--mx": `${mx * 100}%`,
      "--my": `${my * 100}%`,
      "--angle": `${mx * 240}deg`,
      duration: 0.28,
      ease: "power2.out",
    } as any)
  }

  const onLeave = () => {
    gsap.to(cardRef.current!, { rotateX: 0, rotateY: 0, translateZ: 0, duration: 0.5, ease: "expo.out" })
  }

  const Container = as as any

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="card-3d"
      style={{ perspective: "1000px" }}>
      <Container
        ref={containerRef}
        onClick={onClick}
        href={href}
        className={[
          "holo holo--soft", // <- wähle soft/mid/loud
          "relative rounded-2xl border border-black/5 shadow-xl",
          "transition-[box-shadow,transform] duration-300",
          "bg-[#fefefc] text-left w-full max-w-xs",
          className,
        ].join(" ")}
        {...rest}>
        {/* Shine-Layer */}
        <div className="holo-shine rounded-2xl" />

        {/* Inhalt bewusst unter die Overlays legen */}
        <div ref={cardRef} className="relative z-[1] p-5">
          {children}
        </div>
      </Container>
    </div>
  )
})

export default HoloCard
