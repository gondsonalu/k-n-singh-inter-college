import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaArrowRight,
  FaBookOpen,
  FaUsers,
  FaAward,
  FaChalkboardTeacher,
  FaFlask,
  FaFutbol,
  FaBuilding
} from 'react-icons/fa'
import API from '../../utils/api'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
})

const stats = [
  { icon: FaAward, label: 'Established', value: '1985' },
  { icon: FaUsers, label: 'Students', value: '2500+' },
  { icon: FaChalkboardTeacher, label: 'Faculty', value: '45+' },
  { icon: FaBookOpen, label: 'Courses', value: '12+' },
]

const facilities = [
  { icon: FaFlask, title: 'Science Labs' },
  { icon: FaBookOpen, title: 'Library' },
  { icon: FaFutbol, title: 'Sports' },
  { icon: FaBuilding, title: 'Smart Classes' },
]

export default function HomePage() {
  const [notices, setNotices] = useState([])
  const [courses, setCourses] = useState([])
  const [loadingNotices, setLoadingNotices] = useState(true)

  useEffect(() => {
    API.get('/notices?limit=5')
      .then(r => setNotices(r.data.data))
      .finally(() => setLoadingNotices(false))

    API.get('/courses')
      .then(r => setCourses(r.data.data.slice(0, 4)))
  }, [])

  return (
    <div className="bg-[#020617] text-white">

      {/* 🔥 HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/college.jpg')" }}
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 px-6 max-w-4xl">
          <motion.h1 {...fadeUp(0.2)}
            className="text-4xl md:text-7xl font-extrabold mb-6">
            K N Singh Inter College
          </motion.h1>

          <motion.p {...fadeUp(0.4)}
            className="text-lg text-white/80 mb-10">
            Excellence in education since 1985.
          </motion.p>

          <motion.div {...fadeUp(0.6)} className="flex gap-4 justify-center">
            <Link to="/courses" className="btn-primary">
              Explore Courses <FaArrowRight className="inline ml-2" />
            </Link>
            <Link to="/contact" className="btn-outline">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 🔔 NOTICE */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {loadingNotices
            ? "Loading..."
            : notices.map(n => `📢 ${n.title}`).join(" • ")}
        </div>
      </div>

      {/* 📊 STATS (WITH LIGHT EFFECT) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">

          {stats.map(({ icon: Icon, label, value }, i) => (
            <div key={i} className="relative group overflow-hidden rounded-2xl">

              {/* 🔥 Moving Light */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent rotate-12 animate-[shine_3s_linear_infinite]" />
              </div>

              <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl p-6 text-center">
                <Icon className="mx-auto mb-3 text-cyan-400" size={28} />
                <h3 className="text-2xl font-bold">{value}</h3>
                <p className="text-white/60 text-sm">{label}</p>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 📚 COURSES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold mb-10">Our Courses</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((c) => (
              <div key={c._id} className="relative group overflow-hidden rounded-2xl">

                {/* LIGHT */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent rotate-12 animate-[shine_4s_linear_infinite]" />
                </div>

                <div className="relative bg-white/5 border border-white/10 p-6 backdrop-blur-xl">
                  <h3 className="text-xl font-semibold mb-3">{c.title}</h3>
                  <p className="text-white/70">{c.description}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏫 FACILITIES */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-12">Facilities</h2>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">

          {facilities.map(({ icon: Icon, title }, i) => (
            <div key={i} className="relative group overflow-hidden rounded-2xl">

              {/* LIGHT */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent rotate-12 animate-[shine_5s_linear_infinite]" />
              </div>

              <div className="relative bg-white/5 border border-white/10 p-6 backdrop-blur-xl">
                <Icon className="mx-auto text-indigo-400 mb-4" size={28} />
                <h3>{title}</h3>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 🚀 CTA */}
      <section className="py-20 text-center bg-gradient-to-r from-indigo-600 to-cyan-600">
        <h2 className="text-3xl font-bold mb-4">Admissions Open</h2>
        <Link to="/contact" className="bg-white text-black px-8 py-3 rounded-xl font-semibold">
          Apply Now
        </Link>
      </section>

    </div>
  )
}