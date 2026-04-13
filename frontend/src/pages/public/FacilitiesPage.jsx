import { motion } from 'framer-motion'
import {
  FaFlask,
  FaBookOpen,
  FaFutbol,
  FaDesktop,
  FaBus,
  FaUtensils,
  FaWifi,
  FaShieldAlt
} from 'react-icons/fa'
import { PageHero } from '../../components/public/UIComponents'

const facilities = [
  { icon: FaFlask, title: 'Science Laboratories', desc: 'State-of-the-art Physics, Chemistry, and Biology labs with modern equipment.', color: 'text-blue-400' },
  { icon: FaBookOpen, title: 'Library & Reading Room', desc: '10,000+ books, journals, and quiet reading space.', color: 'text-amber-400' },
  { icon: FaFutbol, title: 'Sports & Athletics', desc: 'Playground with cricket, football, volleyball & athletics.', color: 'text-green-400' },
  { icon: FaDesktop, title: 'Computer Lab', desc: '40+ systems with high-speed internet and latest software.', color: 'text-purple-400' },
  { icon: FaBus, title: 'Transport Facility', desc: 'Safe and reliable bus service across nearby areas.', color: 'text-red-400' },
  { icon: FaUtensils, title: 'Canteen', desc: 'Clean and hygienic food environment for students.', color: 'text-pink-400' },
  { icon: FaWifi, title: 'Smart Classrooms', desc: 'Projectors, smart boards and digital learning tools.', color: 'text-indigo-400' },
  { icon: FaShieldAlt, title: 'Security & Safety', desc: 'CCTV surveillance and trained security staff.', color: 'text-teal-400' },
]

export default function FacilitiesPage() {
  return (
    <div className="bg-[#020617] text-white">

      <PageHero 
        title="Facilities" 
        subtitle="World-class infrastructure to support holistic development" 
      />

      <section className="py-20 max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Campus Facilities
          </h2>
          <p className="text-white/60">
            Everything a student needs for a complete educational experience
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {facilities.map(({ icon: Icon, title, desc, color }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1 }}

              className="relative group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >

              {/* 🔥 MOVING LIGHT */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
              </div>

              {/* ICON */}
              <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition ${color}`}>
                <Icon size={24} />
              </div>

              {/* TITLE */}
              <h3 className="font-semibold text-lg mb-2">
                {title}
              </h3>

              {/* DESC */}
              <p className="text-sm text-white/60 leading-relaxed">
                {desc}
              </p>

            </motion.div>
          ))}

        </div>

      </section>
    </div>
  )
}