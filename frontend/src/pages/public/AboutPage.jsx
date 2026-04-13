import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaQuoteLeft } from 'react-icons/fa'
import { PageHero, SectionWrapper, Spinner } from '../../components/public/UIComponents'
import API from '../../utils/api'

export default function AboutPage() {
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/about')
      .then(r => setAbout(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div>
      <PageHero title="About Us" subtitle="Learn about our institution, vision and legacy" />
      <div className="flex justify-center py-24">
        <Spinner size="lg" />
      </div>
    </div>
  )

  const s = about?.stats || {}
  const c = about?.contactInfo || {}

  return (
    <div className="bg-[#020617] text-white">

      <PageHero title="About Us" subtitle="A legacy of excellence in education since 1985" />

      {/* 🔥 STATS */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">

          {[['Established', s.established || '1985'], ['Students', s.students || '2500+'], ['Faculty', s.faculty || '45+'], ['Courses', s.courses || '12+']].map(([l, v], i) => (
            <motion.div key={i}
              whileHover={{ scale: 1.08 }}
              className="relative group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-center overflow-hidden"
            >

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
              </div>

              <h3 className="text-2xl font-bold relative z-10">{v}</h3>
              <p className="text-sm text-white/60 relative z-10">{l}</p>

            </motion.div>
          ))}

        </div>
      </div>

      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-6">

          {/* 🏫 HISTORY + PRINCIPAL */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">

            {/* LEFT */}
            <div>
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                A Rich Legacy of Education
              </h2>

              <div
                className="text-white/70 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html:
                    about?.history ||
                    '<p>K N Singh Inter College has been a cornerstone of education.</p>',
                }}
              />
            </div>

            {/* RIGHT (Principal Card) */}
            <div className="relative group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden">

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
              </div>

              <FaQuoteLeft className="text-cyan-400 mb-4 relative z-10" size={30} />

              <div
                className="text-white/80 italic leading-relaxed mb-6 relative z-10"
                dangerouslySetInnerHTML={{
                  __html:
                    about?.principalMessage ||
                    '<p>Education is the most powerful weapon.</p>',
                }}
              />

              <div className="flex items-center gap-4 pt-4 border-t border-white/10 relative z-10">

                {about?.principalImage ? (
                  <img
                    src={about.principalImage}
                    alt="Principal"
                    className="w-12 h-12 rounded-full object-cover border border-white/20"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center text-black font-bold">
                    P
                  </div>
                )}

                <div>
                  <p className="font-semibold">{about?.principalName || 'Principal'}</p>
                  <p className="text-white/50 text-sm">
                    Principal, KN Singh Inter College
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* 🎯 VISION & MISSION */}
          <div className="grid md:grid-cols-2 gap-8 mb-24">

            {[
              { title: 'Our Vision', content: about?.vision },
              { title: 'Our Mission', content: about?.mission },
            ].map(({ title, content }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 overflow-hidden"
              >

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine"></div>
                </div>

                <h3 className="text-xl font-bold text-cyan-400 mb-4 relative z-10">
                  {title}
                </h3>

                <div
                  className="text-white/70 leading-relaxed relative z-10"
                  dangerouslySetInnerHTML={{ __html: content || '' }}
                />

              </motion.div>
            ))}

          </div>

          {/* 📞 CONTACT */}
          {c.address && (
            <div className="relative group bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-3xl p-8 overflow-hidden">

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
              </div>

              <h3 className="text-2xl font-bold mb-6 relative z-10">
                Contact Information
              </h3>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm relative z-10">

                {[['📍 Address', c.address], ['📞 Phone', c.phone], ['📧 Email', c.email], ['🌐 Website', c.website]].map(([l, v], i) => (
                  <div key={i}>
                    <p className="text-white/70 mb-1">{l}</p>
                    <p className="text-white font-medium">{v}</p>
                  </div>
                ))}

              </div>

            </div>
          )}

        </div>
      </SectionWrapper>
    </div>
  )
}