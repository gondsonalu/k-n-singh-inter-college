import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaEnvelope } from 'react-icons/fa'
import { PageHero, SkeletonCard, EmptyState } from '../../components/public/UIComponents'
import API from '../../utils/api'

export default function FacultyPage() {
  const [faculty, setFaculty] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const q = search ? `?search=${search}` : ''
    const t = setTimeout(() => {
      setLoading(true)
      API.get(`/faculty${q}`)
        .then(r => setFaculty(r.data.data))
        .catch(() => {})
        .finally(() => setLoading(false))
    }, 400)
    return () => clearTimeout(t)
  }, [search])

  return (
    <div className="bg-[#020617] text-white">

      <PageHero 
        title="Our Faculty" 
        subtitle="Meet the dedicated educators shaping young minds" 
      />

      <section className="py-20 max-w-7xl mx-auto px-6">

        {/* SEARCH */}
        <div className="max-w-md mx-auto mb-12 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or subject..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 backdrop-blur-xl focus:outline-none focus:border-cyan-400 transition"
          />
        </div>

        {/* CONTENT */}
        {loading ? (
          <SkeletonCard count={6} />
        ) : faculty.length === 0 ? (
          <EmptyState
            icon="👨‍🏫"
            title="No faculty found"
            description="Try a different search."
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {faculty.map((f, i) => (
              <motion.div
                key={f._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all hover:shadow-2xl"
              >

                {/* 🔥 SHINE LIGHT EFFECT */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                </div>

                {/* IMAGE */}
                <div className="relative h-56 overflow-hidden">

                  {f.image ? (
                    <img
                      src={f.image}
                      alt={f.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-cyan-400 bg-gradient-to-br from-indigo-600 to-cyan-600">
                      {f.name?.charAt(0)}
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>

                {/* CONTENT */}
                <div className="p-5 relative z-10">

                  <h3 className="text-lg font-semibold">{f.name}</h3>

                  <p className="text-cyan-400 text-sm font-medium">
                    {f.designation}
                  </p>

                  <p className="text-white/60 text-sm mt-1">
                    📚 {f.subject}
                  </p>

                  {f.qualification && (
                    <p className="text-white/50 text-xs mt-1">
                      🎓 {f.qualification}
                    </p>
                  )}

                  {f.experience && (
                    <p className="text-white/50 text-xs mt-0.5">
                      ⏳ {f.experience}
                    </p>
                  )}

                  {f.email && (
                    <a
                      href={`mailto:${f.email}`}
                      className="mt-3 flex items-center gap-2 text-xs text-white/50 hover:text-cyan-400 transition"
                    >
                      <FaEnvelope size={12} /> {f.email}
                    </a>
                  )}

                </div>

              </motion.div>
            ))}

          </div>
        )}

      </section>
    </div>
  )
}