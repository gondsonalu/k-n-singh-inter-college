import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBell, FaChalkboardTeacher, FaImages, FaEnvelope, FaBookOpen } from 'react-icons/fa'
import API from '../../utils/api'

const StatCard = ({ icon: Icon, label, value, color, to, delay }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
    className={`${color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}>
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Icon size={20} /></div>
      <Link to={to} className="text-white/70 hover:text-white text-xs font-medium">Manage →</Link>
    </div>
    <div className="text-3xl font-heading font-bold mb-1">{value}</div>
    <div className="text-white/80 text-sm">{label}</div>
  </motion.div>
)

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/stats').then(r => setStats(r.data.data)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div>
      <div className="mb-6"><div className="skeleton h-8 w-48 mb-2" /><div className="skeleton h-4 w-64" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(5)].map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl" />)}
      </div>
    </div>
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-college-navy">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome to the K N Singh Inter College admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        <StatCard icon={FaBell} label="Total Notices" value={stats?.notices || 0} color="bg-blue-600" to="/admin/notices" delay={0.1} />
        <StatCard icon={FaChalkboardTeacher} label="Faculty Members" value={stats?.faculty || 0} color="bg-emerald-600" to="/admin/faculty" delay={0.15} />
        <StatCard icon={FaImages} label="Gallery Photos" value={stats?.gallery || 0} color="bg-purple-600" to="/admin/gallery" delay={0.2} />
        <StatCard icon={FaBookOpen} label="Courses" value={stats?.courses || 0} color="bg-amber-600" to="/admin/courses" delay={0.25} />
        <StatCard icon={FaEnvelope} label="Messages" value={stats?.messages || 0} color="bg-rose-600" to="/admin/messages" delay={0.3} />
      </div>

      {stats?.unreadMessages > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center justify-between">
          <span className="text-amber-800 text-sm font-medium">📬 You have <strong>{stats.unreadMessages}</strong> unread message(s)</span>
          <Link to="/admin/messages" className="text-amber-700 text-sm font-semibold hover:underline">View →</Link>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notices */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-college-navy">Recent Notices</h3>
            <Link to="/admin/notices" className="text-xs text-college-gold font-medium hover:underline">View All</Link>
          </div>
          {stats?.recentNotices?.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">No notices yet</p>
          ) : stats?.recentNotices?.map(n => (
            <div key={n._id} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.isImportant ? 'bg-red-500' : 'bg-college-gold'}`} />
              <div className="min-w-0">
                <p className="text-sm text-gray-700 font-medium truncate">{n.title}</p>
                <p className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleDateString('en-IN')}</p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex-shrink-0">{n.category}</span>
            </div>
          ))}
        </motion.div>

        {/* Recent Messages */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-bold text-college-navy">Recent Messages</h3>
            <Link to="/admin/messages" className="text-xs text-college-gold font-medium hover:underline">View All</Link>
          </div>
          {stats?.recentMessages?.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">No messages yet</p>
          ) : stats?.recentMessages?.map(m => (
            <div key={m._id} className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!m.isRead ? 'bg-blue-500' : 'bg-gray-300'}`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-700 font-medium">{m.name}</p>
                <p className="text-xs text-gray-500 truncate">{m.subject || m.email}</p>
              </div>
              {!m.isRead && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full flex-shrink-0">New</span>}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
