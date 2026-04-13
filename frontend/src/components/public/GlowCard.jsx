import { useState } from "react"

export default function GlowCard({ children, className = "" }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      onMouseMove={handleMove}
      className={`relative rounded-2xl overflow-hidden group ${className}`}
    >
      {/* 🔥 Moving Light */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, rgba(0,255,255,0.25), transparent 60%)`,
        }}
      />

      {/* 🔥 Shine Sweep Animation */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="absolute w-[150%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12 translate-x-[-120%] group-hover:translate-x-[120%] transition duration-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Border Glow */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-cyan-400/40 transition" />
    </div>
  )
}