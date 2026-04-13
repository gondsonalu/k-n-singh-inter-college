import { motion } from "framer-motion"

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 1.8 }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#020617]"
    >
      <div className="text-center">

        {/* Logo Text Animation */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text"
        >
          K N Singh
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-white/60 tracking-widest text-sm mt-2"
        >
          INTER COLLEGE
        </motion.p>

        {/* Loader Line */}
        <div className="mt-6 w-40 h-[2px] bg-white/10 mx-auto overflow-hidden rounded-full">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="h-full w-1/2 bg-cyan-400"
          />
        </div>

      </div>
    </motion.div>
  )
}