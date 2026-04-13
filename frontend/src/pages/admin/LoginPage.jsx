import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

export default function LoginPage() {
  const { admin, login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  if (admin) return <Navigate to="/admin/dashboard" replace />

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-college-navy flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-5 bg-college-gold blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5 bg-college-gold blur-3xl" />
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-college-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-college-gold font-heading font-bold text-2xl">KN</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-college-navy">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">K N Singh Inter College</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="admin@knsingh.edu.in" className="input-field pl-11" required />
            </div>
          </div>
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••" className="input-field pl-11 pr-11" required />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" onClick={() => setShowPass(s => !s)}>
                {showPass ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 mt-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? <><div className="w-4 h-4 border-2 border-college-navy border-t-transparent rounded-full animate-spin" /> Signing in...</> : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">Default: admin@knsingh.edu.in / Admin@123</p>
      </motion.div>
    </div>
  )
}
