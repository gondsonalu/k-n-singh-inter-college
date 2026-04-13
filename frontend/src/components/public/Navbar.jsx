import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaBars, FaTimes } from "react-icons/fa"

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Courses", path: "/courses" },
  { name: "Faculty", path: "/faculty" },
  { name: "Gallery", path: "/gallery" },
  { name: "Notices", path: "/notices" },
  { name: "Contact", path: "/contact" },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* 🔥 LOGO WITH GLOW */}
        <Link to="/" className="group relative leading-tight">

          {/* Glow */}
          <div className="absolute -inset-2 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition"></div>

          <div className="relative">
            <span className="block text-xl md:text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              K N Singh
            </span>
            <span className="block text-xs md:text-sm text-white/70 tracking-widest">
              INTER COLLEGE
            </span>
          </div>

        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm">

          {links.map((link) => {
            const active = pathname === link.path
            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative group"
              >
                <span
                  className={`transition ${
                    active ? "text-cyan-400" : "text-white/80"
                  }`}
                >
                  {link.name}
                </span>

                {/* 🔥 Underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-cyan-400 transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            )
          })}

        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-xl"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/90 backdrop-blur-xl px-6 pb-6"
        >
          <div className="flex flex-col gap-4 text-center mt-4">

            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`py-2 rounded-lg transition ${
                  pathname === link.path
                    ? "bg-cyan-500/20 text-cyan-400"
                    : "text-white/80 hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            ))}

          </div>
        </motion.div>
      )}
    </header>
  )
}