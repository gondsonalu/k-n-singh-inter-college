import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PageHero, SkeletonCard, EmptyState } from '../../components/public/UIComponents'
import API from '../../utils/api'

const categories = ['All', 'Science', 'Arts', 'Commerce', 'Vocational']

export default function CoursesPage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('All')

  useEffect(() => {
    const params = active !== 'All' ? `?category=${active}` : ''
    API.get(`/courses${params}`)
      .then(r => setCourses(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [active])

  return (
    <div className="bg-[#020617] text-white">

      <PageHero 
        title="Courses & Academics" 
        subtitle="Explore our diverse range of academic programmes" 
      />

      <section className="py-20 max-w-7xl mx-auto px-6">

        {/* FILTER */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActive(cat)
                setLoading(true)
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-xl border ${
                active === cat
                  ? 'bg-cyan-500 text-black border-cyan-400 shadow-lg'
                  : 'bg-white/5 text-white/70 border-white/10 hover:border-cyan-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <SkeletonCard count={4} />
        ) : courses.length === 0 ? (
          <EmptyState
            icon="📚"
            title="No courses found"
            description="No courses available in this category."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {courses.map((c, i) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all hover:shadow-2xl"
              >

                {/* 🔥 GLOW LIGHT EFFECT */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                </div>

                {/* Title + Category */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <h3 className="text-xl font-semibold">{c.title}</h3>

                  <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">
                    {c.category}
                  </span>
                </div>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-5 relative z-10">
                  {c.description}
                </p>

                {/* Info */}
                <div className="grid grid-cols-2 gap-3 text-xs text-white/60 relative z-10">

                  {c.duration && (
                    <div className="bg-white/5 rounded-lg px-3 py-2">
                      ⏱ {c.duration}
                    </div>
                  )}

                  {c.eligibility && (
                    <div className="bg-white/5 rounded-lg px-3 py-2">
                      📋 {c.eligibility}
                    </div>
                  )}

                  {c.seats > 0 && (
                    <div className="bg-white/5 rounded-lg px-3 py-2">
                      👥 {c.seats} Seats
                    </div>
                  )}

                </div>

                {/* Subjects */}
                {c.subjects?.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-white/10 relative z-10">

                    <p className="text-xs font-semibold text-white/50 mb-2">
                      SUBJECTS
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {c.subjects.map((s, j) => (
                        <span
                          key={j}
                          className="text-xs px-2 py-1 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/10"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                  </div>
                )}

              </motion.div>
            ))}

          </div>
        )}

      </section>
    </div>
  )
}