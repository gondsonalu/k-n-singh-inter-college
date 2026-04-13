import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'
import { PageHero, Spinner, EmptyState } from '../../components/public/UIComponents'
import API from '../../utils/api'

const categories = ['All', 'Campus', 'Events', 'Sports', 'Cultural', 'Labs', 'Library', 'Other']

export default function GalleryPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    const q = active !== 'All' ? `?category=${active}` : ''
    setLoading(true)
    API.get(`/gallery${q}&limit=50`)
      .then(r => setItems(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [active])

  return (
    <div className="bg-[#020617] text-white">

      <PageHero 
        title="Photo Gallery" 
        subtitle="Moments captured from our vibrant campus life" 
      />

      <section className="py-20 max-w-7xl mx-auto px-6">

        {/* FILTER */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-xl border ${
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
          <div className="flex justify-center py-20">
            <Spinner size="lg" />
          </div>
        ) : items.length === 0 ? (
          <EmptyState 
            icon="🖼️" 
            title="No images found" 
            description="No gallery images available in this category." 
          />
        ) : (
          <motion.div 
            layout 
            className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >

            {items.map((item, i) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setLightbox(item)}
                className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl cursor-pointer hover:shadow-2xl"
              >

                {/* 🔥 SHINE EFFECT */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 z-10">
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                </div>

                <div className="relative overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title || item.category}
                    loading="lazy"
                    className="w-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="text-white text-2xl">🔍</span>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition">
                    <span className="text-white text-xs font-medium">
                      {item.title || item.category}
                    </span>
                  </div>

                </div>

              </motion.div>
            ))}

          </motion.div>
        )}

      </section>

      {/* 🔥 LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >

            {/* Close */}
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-cyan-400 transition"
              onClick={() => setLightbox(null)}
            >
              <FaTimes size={28} />
            </button>

            {/* Image */}
            <motion.img
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              src={lightbox.image}
              alt={lightbox.title || ''}
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl object-contain"
              onClick={e => e.stopPropagation()}
            />

            {/* Caption */}
            {lightbox.title && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/10 text-white px-5 py-2 rounded-full text-sm">
                {lightbox.title} • {lightbox.category}
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}