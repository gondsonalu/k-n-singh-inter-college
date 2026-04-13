import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'
import { PageHero } from '../../components/public/UIComponents'
import API from '../../utils/api'
import GlowCard from '../../components/public/GlowCard'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return toast.error('Please fill in required fields')
    setLoading(true)
    try {
      await API.post('/contact', form)
      toast.success('Message sent successfully! We will get back to you soon.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#020617] text-white">

      <PageHero 
        title="Contact Us" 
        subtitle="Get in touch with us for admissions, queries and more" 
      />

      <section className="py-20 max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-3 gap-12">

          {/* 🔥 INFO SECTION */}
          <div className="space-y-8">

            <div>
              <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
              <p className="text-white/60 text-sm">
                We are happy to answer your questions about admissions, courses, facilities and more.
              </p>
            </div>

            {[
              { icon: FaMapMarkerAlt, label: 'Address', value: 'Masuriyapur, Azamgarh, Uttar Pradesh – 276001' },
              { icon: FaPhone, label: 'Phone', value: '+91 98765 43210' },
              { icon: FaEnvelope, label: 'Email', value: 'info@knsingh.edu.in' },
              { icon: FaClock, label: 'Office Hours', value: 'Mon–Sat: 8:00 AM – 4:00 PM' },
            ].map(({ icon: Icon, label, value }, i) => (
              
              <GlowCard key={i}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl"
                >

                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Icon />
                  </div>

                  <div>
                    <p className="text-xs text-white/50">{label}</p>
                    <p className="text-sm">{value}</p>
                  </div>

                </motion.div>
              </GlowCard>

            ))}

          </div>

          {/* 🚀 FORM */}
          <div className="lg:col-span-2">

            <GlowCard>
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

                <h3 className="text-2xl font-bold mb-6">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-5">

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400"
                    required
                  />

                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400"
                    required
                  />

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3"
                  />

                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="bg-white/5 border border-white/10 rounded-lg px-4 py-3"
                  >
                    <option value="">Select subject</option>
                    {['Admission Inquiry', 'Course Information', 'Fee Structure', 'Transport', 'General Query'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write your message..."
                    className="sm:col-span-2 bg-white/5 border border-white/10 rounded-lg px-4 py-3 resize-none focus:outline-none focus:border-cyan-400"
                    required
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="sm:col-span-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:scale-105 transition-all rounded-xl py-4 font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </button>

                </form>

              </div>
            </GlowCard>

          </div>

        </div>

        {/* 🗺️ MAP */}
        <div className="mt-16">
          <GlowCard>
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl h-80">
              <iframe
                title="College Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14413.4!2d83.19!3d26.07"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </GlowCard>
        </div>

      </section>
    </div>
  )
}