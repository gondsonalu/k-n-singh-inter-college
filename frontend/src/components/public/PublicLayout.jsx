import { Outlet, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function PublicLayout() {
  const location = useLocation()

  return (
    <div className="relative bg-[#020617] text-white min-h-screen flex flex-col overflow-x-hidden">

      {/* 🔥 Background Glow Effects (Global) */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-[120px] bottom-[-100px] right-[-100px]" />

      </div>

      {/* Navbar */}
      <Navbar />

      {/* 🔥 Page Transition Wrapper */}
      <main className="pt-20 flex-grow">

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  )
}