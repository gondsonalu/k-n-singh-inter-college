import { motion } from 'framer-motion'

export const PageHero = ({ title, subtitle, bg = 'bg-college-navy' }) => (
  <section className={`${bg} text-white py-16 md:py-20 relative overflow-hidden`}>
    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #f59d1a 0%, transparent 50%), radial-gradient(circle at 80% 20%, #f59d1a 0%, transparent 40%)' }} />
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="font-heading text-4xl md:text-5xl font-bold mb-3">{title}</motion.h1>
      {subtitle && <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
        className="text-gray-300 text-lg max-w-2xl">{subtitle}</motion.p>}
      <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
        <span>Home</span><span>/</span><span className="text-college-gold">{title}</span>
      </div>
    </div>
  </section>
)

export const SectionWrapper = ({ children, className = '' }) => (
  <motion.section
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
    className={`py-16 ${className}`}
  >{children}</motion.section>
)

export const SkeletonCard = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white rounded-2xl p-6 shadow-md">
        <div className="skeleton h-40 w-full mb-4" />
        <div className="skeleton h-5 w-3/4 mb-2" />
        <div className="skeleton h-4 w-full mb-1" />
        <div className="skeleton h-4 w-5/6" />
      </div>
    ))}
  </div>
)

export const Spinner = ({ size = 'md' }) => {
  const s = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }[size]
  return <div className={`${s} border-4 border-college-gold border-t-transparent rounded-full animate-spin`} />
}

export const EmptyState = ({ icon, title, description }) => (
  <div className="text-center py-16">
    <div className="text-6xl mb-4">{icon}</div>
    <h3 className="font-heading text-xl text-gray-600 mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
)
