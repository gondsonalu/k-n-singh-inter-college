import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaSearch, FaBell } from 'react-icons/fa'
import { PageHero, Spinner, EmptyState } from '../../components/public/UIComponents'
import API from '../../utils/api'

const categories = ['All', 'General', 'Exam', 'Admission', 'Event', 'Holiday', 'Result']

export default function NoticesPage() {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    setLoading(true)
    const params = new URLSearchParams({ page, limit: 10 })
    if (category !== 'All') params.set('category', category)
    if (search) params.set('search', search)

    API.get(`/notices?${params}`)
      .then(r => {
        setNotices(r.data.data)
        setPages(r.data.pages)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [category, search, page])

  return (
    <div className="bg-[#020617] text-white">

      <PageHero 
        title="Notices & News" 
        subtitle="Stay updated with the latest announcements" 
      />

      <section className="py-20 max-w-4xl mx-auto px-6">

        {/* 🔍 SEARCH + FILTER */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">

          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search notices..."
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 backdrop-blur-xl focus:outline-none focus:border-cyan-400"
            />
          </div>

          <select
            value={category}
            onChange={e => { setCategory(e.target.value); setPage(1) }}
            className="bg-white/5 border border-white/10 rounded-full px-4 py-3 text-white backdrop-blur-xl"
          >
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>

        </div>

        {/* 📦 CONTENT */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : notices.length === 0 ? (
          <EmptyState 
            icon="📋" 
            title="No notices found" 
            description="No notices match your search." 
          />
        ) : (

          <div className="space-y-5">

            {notices.map((n, i) => (
              <motion.div
                key={n._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative group rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl hover:-translate-y-1 transition-all duration-300"
              >

                {/* 🔥 MOVING SHINE EFFECT */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
                </div>

                {/* HEADER */}
                <button
                  onClick={() => setExpanded(expanded === n._id ? null : n._id)}
                  className="relative z-10 w-full text-left p-5 flex items-start gap-4"
                >

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    n.isImportant ? 'bg-red-500/20' : 'bg-cyan-500/20'
                  }`}>
                    <FaBell className={n.isImportant ? 'text-red-400' : 'text-cyan-400'} size={14} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-2 mb-1">

                      <h3 className="font-semibold">
                        {n.title}
                      </h3>

                      {n.isImportant && (
                        <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400 border border-red-400/20">
                          Important
                        </span>
                      )}

                      <span className="text-xs px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">
                        {n.category}
                      </span>

                    </div>

                    <p className="text-xs text-white/50">
                      {new Date(n.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>

                  </div>

                  <span className="text-white/50 ml-2">
                    {expanded === n._id ? '▲' : '▼'}
                  </span>

                </button>

                {/* EXPAND */}
                {expanded === n._id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="overflow-hidden border-t border-white/10"
                  >
                    <div
                      className="px-5 py-4 text-white/70 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: n.content }}
                    />
                  </motion.div>
                )}

              </motion.div>
            ))}

          </div>
        )}

        {/* 🔢 PAGINATION */}
        {pages > 1 && (
          <div className="flex justify-center gap-3 mt-10 flex-wrap">

            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition ${
                  page === p
                    ? 'bg-cyan-500 text-black'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:border-cyan-400'
                }`}
              >
                {p}
              </button>
            ))}

          </div>
        )}

      </section>
    </div>
  )
}